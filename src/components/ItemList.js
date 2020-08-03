import React from 'react';
import List from '@material-ui/core/List';
import Item from './Item';

export default function ItemList({ items }) {
  return (
    <List component='nav'>
      {items.map((item) => (
        <Item key={item.id} id={item.id} habit={item.habit} />
      ))}
    </List>
  );
}
