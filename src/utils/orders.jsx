import {
  useEffect, // manejo de APIrequest en primer renderizado o cuando las dependecias cambien
  useState // manejar estados en los cambios
} from 'react';
import { useNavigate } from 'react-router-dom'; // navegar entre router
// COMPONENTES
import ApiRequest, { url } from '../services/apiRequest.jsx';

// LÓGICA DE LA SECCIÓN DE PEDIDOS
export function OrdersLogic() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const [ordersData, setOrdersData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(['Entregado', 'Listo en barra', 'En preparación']);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [editModalTable, setEditModalTable] = useState('');
  const [editModalClient, setEditModalClient] = useState('');
  const [editModalStatus, setEditModalStatus] = useState(null);
  const [errorLabel, setErrorLabel] = useState('');
  const [editModalProducts, setEditModalProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Redirigir al usuario al inicio de sesión si no hay un accessToken
    if (!token) {
      navigate('/login');
      return;
    }

    // Redirigir al usuario al inicio de sesión si no tiene el role autorizado
    if (role === 'chef') {
      navigate('/login');
      return;
    }

    // OBTENER DATOS DE PEDIDOS
    ApiRequest({
      url: `${url}/orders`,
      method: 'get',
    })
      .then((response) => {
        const filteredOrders = response.data.filter( //sólo muestra pedidos de usuario logeado
          (order) => order.userId === userId
        );

        setOrdersData(filteredOrders);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data === 'jwt expired' && error.response.status === 401) {
          navigate('/login');
        } else {
          navigate('/error-page');
        }
      });

    // OBTENER DATOS DE PRODUCTOS
    ApiRequest({
      url: `${url}/products`,
      method: 'get',
    })
      .then((response) => {
        setProductsData(response.data);
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
  }, [navigate, token, userId, role]);

  // LLEVA AL MENU
  const handleMenuClick = () => {
    navigate('/menu');
  };

  // MANEJA CAMBIOS DE LOS CHECKBOX Y ALMACENA LA SELECCIÓN EN UN ARRAY
  const handleStatusChange = (event) => {
    const statusValue = event.target.value;
    if (event.target.checked) {
      setSelectedStatus((prevSelectedStatus) => [...prevSelectedStatus, statusValue]);
    } else {
      setSelectedStatus((prevSelectedStatus) =>
        prevSelectedStatus.filter((status) => status !== statusValue)
      );
    }
  };

  // FILTRAR ORDENES POR ESTATUS
  const filteredOrdersData = selectedStatus.length === 0 ? ordersData : ordersData.filter((order) => selectedStatus.includes(order.status)
  );


  // OBTENER PRODUCTOS DE CADA ORDEN PARA LA TABLA
  const getProductsList = (products) => {
    return products.map((item) => `${item.qty} ${item.product.name}`).join(', ');
  };

  // SEGÚN STATUS DA LA CLASE PARA DAR COLOR AL TEXTO EN LA TABLA
  const getStatusColor = (status) => {
    const statusColors = {
      'Entregado': 'green',
      'Listo en barra': 'yellow',
      'En preparación': '',
    }
    return statusColors[status];
  }

  // OBTENER LA CUENTA TOTAL DE LA ORDEN PARA LA TABLA
  const getTotalOrder = (prices) => {
    return prices.reduce(
      (total, item) => total + item.qty * item.product.price,
      0
    );
  };

  // CERRAR DIÁLOGOS MODALES
  const handleCloseModal = () => {
    setModalOrderId(null); // Limpiar el orderId al cerrar la modal
    setModalOpenDelete(false);
    setModalOpenEdit(false);
  };

  // ABRRIR MODAL EDITAR CON LOS DATOS DE LA ORDEN AL CLICKEAR BOTON DE LA TABLA
  const handleOpenEditModal = (orderId) => {
    setModalOrderId(orderId);
    setModalOpenEdit(true);
    const order = ordersData.find((order) => order._id === orderId);
    setEditModalTable(order.table);
    setEditModalClient(order.client);
    setEditModalStatus(order.status);
    console.log('handle open edit modal products bef', order.products)
    const newModalProducts = order.products.map((item) => ({
      qty: item.qty,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        type: item.product.type,
        dateEntry: item.product.dateEntry
      }
    }));
    setEditModalProducts(newModalProducts)
    console.log('editmodalproducts here', editModalProducts)
    console.log('neweditmodalproducts here', newModalProducts)
  }

  // MANEJO DE CAMBIOS EN LA CANTIDAD DE LOS PRODUCTOS EN LA MODAL EDITAR
  const handleEditModalProductQtyChange = (productId, event) => {
    const updatedProducts = editModalProducts.map((product) => {
      console.log('prodddd', product)
      if (product.product.id === productId) {
        return { ...product, qty: Number(event.target.value) };
      }
      return product;
    });
    console.log('updated products in handle edit modal product qty change', editModalProducts, updatedProducts)
    setEditModalProducts(updatedProducts);
  };

  // AÑADIR PRODUCTOS A LA ORDEN EN MODAL EDITAR
  const handleAddProductToOrder = (productId) => {
    console.log('editmodalproducts', editModalProducts)
    let productToAdd = editModalProducts.find((product) => product.product.id === productId);
    console.log('productToAdd ', productToAdd)
    if (productToAdd) {
      // productToAdd = { ... product, qty: (productToAdd.qty++)}
      setEditModalProducts((prevProducts) => {
        console.log('los prevproducts', prevProducts)
        const newProductToAdd = { product: { ... productToAdd.product}, qty: (productToAdd.qty+=1)}
        console.log('product destructured', newProductToAdd)
        prevProducts.toSpliced(prevProducts.indexOf(productToAdd), 1, newProductToAdd)
        console.log('new prev products', prevProducts)
        return prevProducts
      })
    } else {
      const newItem = productsData.find(item => {
        
        console.log('product._id', item._id)
        return item._id === productId;
      });
        console.log('productsData', productsData)
      
        console.log('newitemu', newItem)
      setEditModalProducts((prevProducts) => [
        ...prevProducts,
        {
          qty: 1,
          product: {
            id: newItem._id,
            name: newItem.name,
            price: newItem.price,
            image: newItem.image,
            type: newItem.type,
            dateEntry: newItem.dateEntry
          }
        },
      ]);
    }
  };

  // ACTUALIZAR PEDIDOS DE LA ORDEN EN LA MODAL EDITAR CUANDO SE QUIERE ELIMINAR UNO
  const handleEditModalProductDelete = (productId) => {
    const updatedProducts = editModalProducts.filter((product) => product.product.id !== productId);
    setEditModalProducts(updatedProducts);
  };

  // OBTIENE EL COSTO TOTAL DE LA ORDEN EN LA MODAL EDITAR
  const getUpdatedTotalOrder = () => {
    return editModalProducts.reduce(
      (total, product) => total + product.qty * (product.product? product.product.price : product.price),
      0
    );
  };

  // OBTIENE EL OBJETO CON LA INFORMACIÓN DE LA EDICIÓN DE LA ORDEN
  const getUpdatedOrder = () => {
    const updatedOrder = { 
      client: editModalClient,
      table: Number(editModalTable),
      products: editModalProducts,
      status: editModalStatus,
    };
    return updatedOrder;
  };

  // FUNCIÓN PARA CONFIRMAR LA EDICIÓN DE UNA ORDEN EN LA MODAL
  const handleConfirmEditClick = () => {
    const orderId = modalOrderId;
    const body = getUpdatedOrder();

    // Si algún campo está vacío imprime etiqueta de error
    const hasEmptyFields = Object.values(body).some(value => value === '');
    if (hasEmptyFields) {
      setErrorLabel('Completa todos los campos');
      return;
    } else {
      setErrorLabel('')
    }

    ApiRequest({
      url: `${url}/orders/${orderId}`,
      method: 'patch',
      body: body,
    })
      .then(() => {
        // Actualizar estado de pedidos para reflejar cambios en la interfaz
        setOrdersData(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order._id === orderId) {
              return { ...order, ...body };
            }
            return order;
          });
          return updatedOrders;
        });
        handleCloseModal();
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

  // ABRE MODAL PARA CONFIRMAR BORRAR UNA ORDEN AL CLICKEAR BOTON DE LA TABLA
  const handleOpenModalDelete = (orderId) => {
    setModalOrderId(orderId);
    setModalOpenDelete(true);
  }

  // FUNCIÓN PARA CONFIRMAR BORRAR UNA ORDEN EN LA MODAL
  const handleConfirmDeleteClick = (orderId) => {
    const orderDelete = ordersData.find(order => order._id === orderId);

    const body = orderDelete;

    ApiRequest({
      url: `${url}/orders/${orderId}`,
      method: 'delete',
      body: body,
    })
      .then(() => {
        // Actualiza la informacion de la tabla para borrar la orden en ella
        setOrdersData(prevOrders => prevOrders.filter(order => order._id !== orderId));
        setModalOpenDelete(false);
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

  // FUNCIÓN PARA CAMBIAR STATUS DE LA ORDEN COMO ENTRAGADA AL CLICKEAR BOTON DE LA TABLA
  const handleCheckClick = (orderId) => {
    const body = {
      "status": "Entregado"
    };

    ApiRequest({
      url: `${url}/orders/${orderId}`,
      method: 'patch',
      body: body,
    })
      .then(() => {
        // Actualiza info de la tabla
        setOrdersData(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order._id === orderId) {
              return { ...order, status: "Entregado" };
            }
            return order;
          });
          return updatedOrders;
        });
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

  return {
    getProductsList,
    getTotalOrder,
    handleMenuClick,
    getStatusColor,
    handleCheckClick,
    handleConfirmDeleteClick,
    handleOpenModalDelete,
    handleCloseModal,
    handleOpenEditModal,
    handleEditModalProductQtyChange,
    getUpdatedOrder,
    handleConfirmEditClick,
    getUpdatedTotalOrder,
    handleAddProductToOrder,
    handleEditModalProductDelete,
    ordersData,
    modalOpenDelete,
    modalOrderId,
    modalOpenEdit,
    editModalTable,
    errorLabel,
    setEditModalTable,
    editModalClient,
    setEditModalClient,
    editModalStatus,
    setEditModalStatus,
    productsData,
    editModalProducts,
    handleStatusChange,
    filteredOrdersData,
    selectedStatus,
  };
}