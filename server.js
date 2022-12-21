const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/form', (req, res) => {
    const name = req.body.name;
    const prenom = req.body.prenom;
    const dateNaissance = req.body.date_naissance;
    const niveauEtudes = req.body.niveau_etudes;
    const nomEcole = req.body.nom_ecole;
    const nomDiplome = req.body.nom_diplome;
    const description = req.body.description;
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Nouvelle soumission de formulaire',
        html: `
      <h2>Informations du formulaire</h2>
      <ul>
        <li>Nom : ${name}</li>
        <li>Prénom : ${prenom}</li>
        <li>Date de naissance : ${dateNaissance}</li>
        <li>Niveau d'études : ${niveauEtudes}</li>
        <li>Nom de l'école : ${nomEcole}</li>
        <li>Nom du diplôme : ${nomDiplome}</li>
        <li>Description : ${description}</li>
        <li>Adresse mail : ${email}</li>
      </ul>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Une erreur est survenue lors de l'envoi du formulaire.');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.send('Le formulaire a été envoyé avec succès.');
        }
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
