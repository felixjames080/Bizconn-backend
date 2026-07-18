const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword
      }
    });

    const wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      },
      wallet
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

   const token = jwt.sign(
  {
    userId: user.id,
    role: user.role,
    verificationStatus: user.verificationStatus
  },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      token,
      user: safeUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.submitKYC = async (req, res) => {
  try {
    const {
      nationalId,
      faceImage,
      selfieImage
    } = req.body;

    const user = await prisma.user.update({
      where: {
        id: req.user.userId
      },
      data: {
        nationalId,
        faceImage,
        selfieImage,
        verificationStatus: 'PENDING'
      }
    });

    return res.json({
      success: true,
      message: 'KYC submitted',
      user
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};