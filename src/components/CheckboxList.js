import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import fetchData from "../util/Dao";

export default class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event, id){
    this.props.onCheckedListChange(id);
  }
  render() {
    
    const data = fetchData();
    const checkedRouteList = this.props.checkedRouteList;

    return (
      <div className="formBlock">
        <form id="form">
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {data.map((value) => {

              return (
                <ListItem
                  key={value.properties.id}
                  disablePadding
                >
                  <ListItemButton
                    onClick={event => this.handleChange(event, value.properties.id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                      checked={checkedRouteList.indexOf(value.properties.id) !== -1}

                      />
                    </ListItemIcon>
                    <ListItemText primary={`${value.properties.name}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </form>
      </div>
    );
  }
}
