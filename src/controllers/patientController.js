const { Sequelize } = require("sequelize");
const Patient = require("../models/Patient");

module.exports = {
    async newPatient(req, res) {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }
        const isPatientNew = await Patient.findOne({
            where: { email }
        });
        if (isPatientNew)
            res.status(403).json({ msg: "Paciente já foi cadastrado." });
        else {
            const patient = await Patient.create({
                name, email, phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });

            if (patient) res.status(201).json({ msg: "Novo paciente foi adicionado." });
            else res.status(404).json({ msg: "Não foi possível cadastrar novo paciente." });
        }
    },

    async searchPatientByName(req, res) {
        const name = req.body.name;
        if (!name)
            res.status(400).json({
                msg: "Parâmetro nome está vazio."
            });
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: { name: { [Op.like]: "%" + name + "%" } },
        });
        if (patient) {
            if (patient == "")
                res.status(404).json({
                    msg: "Paciente não encontrado."
                });
            else res.status(200).json({ patient });
        }
        else
            res.status(404).json({
                msg: "Paciente não encontrado."
            });
    },
    async searchPacientByPhysician(req, res) {
        const namePhysician = req.body.namePhysician;
        if (!namePhysician) res.status(400).json({ msg: "Parâmetro médico vazio." });
        const Op = Sequelize.Op;
        // const physician = await Pa
    }
};

