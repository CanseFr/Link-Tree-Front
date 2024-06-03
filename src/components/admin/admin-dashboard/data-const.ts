
export interface ArrayTitleOfBlockType {
  titleOne: string;
  titleTwo: string;
  desc: string;
  btn: string;
  imgPath: string;
}

export const arrayTitleOfBlock: ArrayTitleOfBlockType[] =
  [
    {
      titleOne: "User",
      titleTwo: "Gestion des utilisateurs",
      desc: "Ajustez et mettez a jour la page de votre profil pour tenir au courant votre communauté.",
      btn: "Modifier",
      imgPath: "src/assets/modify.png"
    },
    {
      titleOne: "Stats",
      titleTwo: "Consulter les statistique",
      desc: "Découvrez le audiences et suivez les statistique que genere vos clients.",
      btn: "Consulter",
      imgPath: "src/assets/stat.png"
    },
    {
      titleOne: "Support",
      titleTwo: "Aidez les client",
      desc: "Discutez avec vos clients pour gerer leurs demandes via le chat.",
      btn: "Aider",
      imgPath: "src/assets/support.png"
    },
    {
      titleOne: "Facturation",
      titleTwo: "Consultez la facturation",
      desc: "Gerez les factures de vos clients.",
      btn: "Gerer",
      imgPath: "src/assets/paiement.png"
    },
  ]
