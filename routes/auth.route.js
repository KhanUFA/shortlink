const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Несуществующая почта').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Некорректный данные при регистрации'})
        }

        const {email, password} = req.body
        const visitor = await User.findOne({email})

        if(visitor){
            return res.status(400).json({message:'Данный пользователь существует'})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashPassword})

        await user.save()
        return res.status(201).json({message: 'Пользователь зарегистрирован'})

    }catch (e) {
        console.log("Server", "Error: ", e)
        return res.status(500).json({message:'Ошибка сайта! Повторите попытку'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.result(400).json({errors: errors.array(), message: 'Некоректные данные при входе!'})
        }

        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        await res.json({token, userId: user.id})

    }catch (e) {
        return res.status(500).json({message:'Ошибка сайта! Повторите попытку'})
    }
})

module.exports = router