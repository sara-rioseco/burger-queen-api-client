// ProductsLogic.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../services/apiRequest.jsx';

export function ProductsLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const [productsData, setProductsData] = useState([]);
  const [modalOpenDeleteProducts, setModalOpenDeleteProducts] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);
  const [modalOpenEditProducts, setModalOpenEditProducts] = useState(false);
  const [editingProductData, setEditingProductData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['Desayuno', 'Almuerzo']);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    type: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    ApiRequest({
      url: 'http://localhost:8080/products',
      method: 'get',
    })
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          navigate('/login');
        } else {
          navigate('/error-page');
        }
      });
  }, [navigate, token]);

   // FILTRO DE PRODUCTOS POR TIPO
  const handleTypeCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(selectedType => selectedType !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // ABRE MODAL PARA CONFIRMAR BORRAR UN USUARIO AL CLICKEAR BOTON DE LA TABLA
  const handleOpenModalDeleteProducts = (productId) => {
    setModalProductId(productId);
    setModalOpenDeleteProducts(true);
  }

  // FUNCIÓN PARA CONFIRMAR BORRAR UN USUARIO EN LA MODAL
  const handleConfirmDeleteClickProducts = (productId) => {
    const productDelete = productsData.find(product => product.id === productId);

    const body = productDelete;

    ApiRequest({
      url: `http://localhost:8080/products/${productId}`,
      method: 'delete',
      body: body,
    })
      .then(() => {
        // Actualiza la informacion de la tabla para borrar el usuario en ella
        setProductsData(prevProducts => prevProducts.filter(product => product.id !== productId));
        setModalOpenDeleteProducts(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          console.error(error);
          navigate('/login');
        } else {
          console.error(error);
          error && navigate('/error-page');
        }
      });
  }

  // ABRRIR MODAL EDITAR CON LOS DATOS DEL USUARIO AL CLICKEAR BOTON DE LA TABLA
  const handleOpenEditModalProducts = (productsId) => {
    const productToEdit = productsData.find(product => product.id === productsId);
    setEditingProductData(productToEdit);
    setModalProductId(productsId);
    setModalOpenEditProducts(true);
  }

  // MANEJO DE LOS CAMBIOS DE VALORES DE LOS CAMPOS DE LA MODAL EDITAR
  const handleInputChange = (fieldName, value) => {
    setEditingProductData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // CONFIRMA LA EDICIÓN DEL USUARIO
  const handleConfirmEditClickProducts = () => {
    const updateProducts = {
      name: editingProductData.name,
      price: editingProductData.price,
      type: editingProductData.type,
    };

    ApiRequest({
      url: `http://localhost:8080/products/${editingProductData.id}`,
      method: 'patch',
      body: updateProducts,
    })
      .then(() => {
        // ACTUALIZA LA DATA CON LA INFORMACIÓN OBTENIDA DE LA EDICIÓN
        const updatedProductsData = productsData.map(product => {
          if (product.id === editingProductData.id) {
            return {
              ...product,
              name: editingProductData.name,
              price: editingProductData.price,
              type: editingProductData.type,
            };
          } else {
            return product;
          }
        });

        setProductsData(updatedProductsData);
        handleCloseModalProducts();
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          console.error(error);
          navigate('/login');
        } else {
          console.error(error);
          error && navigate('/error-page');
        }
      });
  };

  // ABRE LA MODAL PARA AGREGAR UN USUARIO CON LOS CAMPOS VACÍOS
  const handleAddClick = () => {
    setNewProduct({
      name: '',
      price: '',
      type: '',
    });
    setAddModalOpen(true);
  };

  // CONFIRMA QUE SE AGREGUE UN USUARIO Y ACTUALIZA LA INFORMACIÓN EN LA TABLA
  const handleConfirmAddClick = () => {
    ApiRequest({
      url: `http://localhost:8080/products`,
      method: 'post',
      body: newProduct,
    })
      .then((response) => {
        const dataNewProduct = response.data.product;
        setProductsData(prevProducts => [...prevProducts, dataNewProduct]);
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          console.error(error);
          navigate('/login');
        } else {
          console.error(error);
          error && navigate('/error-page');
        }
      });
  };

  // CERRAR DIÁLOGOS MODALES
  const handleCloseModalProducts = () => {
    setModalProductId(null); // Limpiar el productsId al cerrar la modal
    setModalOpenDeleteProducts(false);
    setModalOpenEditProducts(false);
    setAddModalOpen(false);
  };

  return {
    productsData,
    handleOpenModalDeleteProducts,
    handleConfirmDeleteClickProducts,
    handleOpenEditModalProducts,
    setModalOpenDeleteProducts,
    handleCloseModalProducts,
    handleAddClick,
    setNewProduct,
    handleInputChange,
    handleConfirmEditClickProducts,
    handleConfirmAddClick,
    handleTypeCheckboxChange,
    modalProductId,
    modalOpenDeleteProducts,
    modalOpenEditProducts,
    editingProductData,
    addModalOpen,
    newProduct,
    selectedTypes,
  };
}
