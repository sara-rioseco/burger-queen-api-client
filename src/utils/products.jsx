import { useEffect, useState } from 'react'; // manejo de APIrequest en primer renderizado o cuando las dependecias cambien
import { useNavigate } from 'react-router-dom';// navegar entre router
// COMPONENTES
import ApiRequest from '../services/apiRequest.jsx';

// LÓGICA DE LA SECCIÓN DE PRODUCTOS
export function ProductsLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  const [productsData, setProductsData] = useState([]);
  const [modalOpenDeleteProducts, setModalOpenDeleteProducts] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);
  const [modalOpenEditProducts, setModalOpenEditProducts] = useState(false);
  const [editingProductData, setEditingProductData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['Desayuno', 'Almuerzo']);
  const [errorLabel, setErrorLabel] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: undefined,
    type: '',
    image: '',
  });

  useEffect(() => {
    // Redirigir al usuario al inicio de sesión si no hay un accessToken
    if (!token) {
      navigate('/login');
      return;
    }

    // Redirigir al usuario al inicio de sesión si no tiene el role autorizado
    if (role != 'admin') {
      navigate('/login');
      return;
    }

    // OBTENER DATOS DE PRODUCTOS
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
  }, [navigate, token, role]);

  // FILTRO DE PRODUCTOS POR TIPO
  const handleTypeCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(selectedType => selectedType !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // CERRAR DIÁLOGOS MODALES
  const handleCloseModalProducts = () => {
    setModalProductId(null); // Limpiar el productsId al cerrar la modal
    setModalOpenDeleteProducts(false);
    setModalOpenEditProducts(false);
    setAddModalOpen(false);
  };

  // MANEJO DE CAMBIOS DE VALORES EN LOS CAMPOS DE LAS MODALES
  const handleInputChange = (fieldName, value) => {
    setEditingProductData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // ABRE LA MODAL PARA AGREGAR UN PRODUCTO CON LOS CAMPOS VACÍOS
  const handleAddClick = () => {
    setNewProduct({
      name: '',
      price: undefined,
      type: '',
      image: '',
    });
    setAddModalOpen(true);
  };

  // CONFIRMA QUE SE AGREGUE UN PRODUCTO Y ACTUALIZA LA INFORMACIÓN EN LA TABLA
  const handleConfirmAddClick = () => {
    // Si algún campo está vacío imprime etiqueta de error
    const hasEmptyFields = Object.values(newProduct).some(value => value === '');
    if (hasEmptyFields) {
      setErrorLabel('Completa todos los campos');
      return;
    } else {
      setErrorLabel('')
    }

    ApiRequest({
      url: `http://localhost:8080/products`,
      method: 'post',
      body: newProduct,
    })
      .then((response) => {
        // Actualizar la tabla con el nuevo producto
        const dataNewProduct = response.data;
        setProductsData(prevProducts => [...prevProducts, dataNewProduct]);
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          navigate('/login');
        } else {
          error && navigate('/error-page');
        }
      });
  };

  // ABRRIR MODAL EDITAR CON LOS DATOS DEL PRODUCTO AL CLICKEAR BOTON DE LA TABLA
  const handleOpenEditModalProducts = (productsId) => {
    const productToEdit = productsData.find(product => product.id === productsId);
    setEditingProductData(productToEdit);
    setModalProductId(productsId);
    setModalOpenEditProducts(true);
  }

  // CONFIRMA LA EDICIÓN DEL PRODUCTO
  const handleConfirmEditClickProducts = () => {
    const updateProducts = {
      name: editingProductData.name,
      price: parseInt(editingProductData.price),
      type: editingProductData.type,
      image: editingProductData.image,
    };

    console.log(updateProducts.price);
    console.log(typeof(updateProducts.price));

    // Si algún campo está vacío imprime etiqueta de error
    const hasEmptyFields = Object.values(updateProducts).some(value => value === '' || value === undefined);
    if (hasEmptyFields || isNaN(updateProducts.price)) {
      setErrorLabel('Completa todos los campos');
      return;
    } else {
      setErrorLabel('')
    }

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
              image: editingProductData.image,
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

  // ABRE MODAL PARA CONFIRMAR BORRAR UN PRDUCTO AL CLICKEAR BOTON DE LA TABLA
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
        // Actualiza la informacion de la tabla para borrar el producto en ella
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
    errorLabel,
  };
}
