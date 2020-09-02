import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Drawer, List, Divider, ListItem, ListItemText, IconButton} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import AddIcon from '@material-ui/icons/Add';







export default function TemporaryDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemText><HomeIcon/> Página Inicial</ListItemText>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => history.push('/estoque')}>
          <ListItemText><StorageIcon/> Estoque atual</ListItemText>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => history.push('/saida')}>
          <ListItemText><AddIcon/> Entregar EPI</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/saidas')}>
          <ListItemText>Ultimas Entregas</ListItemText>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => history.push('/entrada')}>
          <ListItemText><AddIcon/> Entrada de EPI</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/entradas')}>
          <ListItemText>Ultimas Entradas</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon className={classes.MenuIcon} />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles({
  list: {
    width: 350
  },
  fullList: {
    width: "auto"
  },

  menuButton: {
    color: '#53CC7D',
    //marginRight: theme.spacing(2),
  },
  MenuIcon:{
    fontSize: '3.0rem'
  }
});
