import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export const Home = () => {
  return (
    <>
      <Card sx={{minWidth: 400, mt: 10, backgroundColor: 'black'}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="white" gutterBottom>
            Fonctionalité
          </Typography>
          <Typography variant="h5" color="white" component="div">
            Découvrez notre plateforme
          </Typography>
          <Typography sx={{mb: 1.5}} color="white" variant="body2">
            Link Tree permet de mettre en valeur votre contenu de maniere gratuite en ligne,
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="200"
          width="200"
          image="src/assets/home_section_1.png"
          alt="Paella dish"
        />
        <CardActions>
          <Button sx={{color: "white"}} size="small">Decouvrire les fonctionnalités</Button>
        </CardActions>
      </Card>

      <Card sx={{minWidth: 400, mt: 10, backgroundColor: 'black'}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="white" gutterBottom>
            Boostez votre reseau
          </Typography>
          <Typography variant="h5" color="white" component="div">
            Augmentez votre audiance
          </Typography>
          <Typography sx={{mb: 1.5}} color="white" variant="body2">
            Mettez en lien votre contenue et votre communauté
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="200"
          width="200"
          image="src/assets/home_section_2.jpg"
          alt="Paella dish"
        />
        <CardActions>
          <Button sx={{color: "white"}} size="small">Consulter</Button>
        </CardActions>
      </Card>
    </>
  )
}