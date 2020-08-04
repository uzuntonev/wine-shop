import React, { useState, useEffect, useContext } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../../store/store';
import { getUserProducts, getProducts } from '../../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';
import { Grid } from '@material-ui/core';
import productService from '../../../services/product-service';
const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: 20,
      alignSelf: 'center',
      marginBottom: theme.spacing(12),
    },
    item: {
      margin: 20,
    },
  };
});
const List = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (state.isAuth) {
      // dispatch(getUserProducts());
      productService.getUserProducts().then(({ data: products }) => {
        setProducts(products);
      });
    } else {
      dispatch(getProducts());
    }
  }, []);

  const renderProducts = (products.length ? products : state.products).map((product) => {
    return (
      <Grid className={classes.item} item xs={3} key={product._id}>
        <Card product={product} />
      </Grid>
    );
  });
  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <Grid container className={classes.root}>
        {renderProducts}
      </Grid>
    </CloudinaryContext>
  );
};

export default List;
