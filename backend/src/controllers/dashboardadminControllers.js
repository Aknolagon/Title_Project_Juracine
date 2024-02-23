const { getRolesForUser } = require("../models/UserRolesManager");

const getAdmin = async (req, res, next) => {
  try {
    const userId = req.auth.sub;

    // Récupérer les rôles de l'utilisateur
    const roles = await getRolesForUser(userId);

    // Vérifiez si l'utilisateur a le rôle "admin"
    const isAdmin = roles.some((role) => role.role_name === "Admin");

    if (isAdmin) {
      // Si l'utilisateur est administrateur, vous pouvez renvoyer les données du tableau de bord admin
      // Remplacez cela par la logique spécifique de votre tableau de bord admin
      res.json({ message: "Welcome to the Admin Dashboard!" });
    } else {
      // Si l'utilisateur n'est pas administrateur, renvoyez une réponse non autorisée
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdmin,
};
