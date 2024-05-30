
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
      titleOne: "Modification",
      titleTwo: "Modifiez votre Tree",
      desc: "Ajustez et mettez a jour la page de votre profil pour tenir au courant votre communauté.",
      btn: "Modifier",
      imgPath: "src/assets/modify.png"
    },
    {
      titleOne: "Statistique",
      titleTwo: "Consulter vos stats\n",
      desc: "Découvrez votre audience et suivez les statistique que generer vos liens affiliés.",
      btn: "Consulter",
      imgPath: "src/assets/stat.png"
    },
    {
      titleOne: "Support",
      titleTwo: "Besoin d'aide ?",
      desc: "Discutez avec notre equipe pour toute demande, un chat live est disponible durant les heure d'ouverture.",
      btn: "Contacter",
      imgPath: "src/assets/support.png"
    },
    {
      titleOne: "Facturation",
      titleTwo: "Consultez vos facturation",
      desc: "Gerez vos facture ou modifier le moyen de paiment de votre compte paiement.",
      btn: "Gerer",
      imgPath: "src/assets/paiement.png"
    },
  ]
