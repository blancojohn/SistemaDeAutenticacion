import { toast } from "react-toastify";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			registerUser: {
				email: "",
				password: ""
			},

			loginUser: {
				email: "",
				password: ""
			},
			/* Las siguientes propiedades guardan los datos de usuario luego de iniciar sesión
			   porque después son untilizados en el sessionStorage */
			user: null,
			accessToken: null, /* Propiedad que recibe el valor de access_token desde la API cuando crea el token */

			dominio: "http://127.0.0.1:3001",

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

		},
		actions: {
			/* Se ejecuta con useEffect dentro del componente Me */
			routePrivateUser: () => {
				const { dominio, accessToken } = getStore()
				const url = `${dominio}/api/private`
				const solicitud = {
					method: 'GET', /* Se debe especificar el  tipo de solicitud y agregar headers para poder pasar el token generado en el  login */
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${accessToken}` 
					}
				}
				fetch(url, solicitud)
					.then(response => {
						return response.json()
					})
					.then(datos => {
						if (datos.msg) toast.error(datos.msg)
						else {
							setStore({
								user: datos
							})
						}
					})
			},

			/* Mantiene abierta la sesión del usuario por los valores asignados
			   a las propiedades del store de sessionStorage. Se ejecuta dentro appContext */
			checkCurrentUser: () => {
				setStore({
					accessToken: sessionStorage.getItem('access_token'),
					user: JSON.parse(sessionStorage.getItem('user'))/* Convierte de nuevo los datos en formato json */
				})
			},

			handleSubmitRegister: (e) => {
				e.preventDefault()

				const { registerUser, dominio } = getStore()
				const { getFetch } = getActions()

				/* URL a acceder */
				const url = `${dominio}/api/register`
				/* Transforma los datos en string */
				const raw = JSON.stringify(registerUser)
				/* Crea las opciones de la petición */
				const solicitud = {
					method: 'POST',
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}

				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.messagge) {
						toast.error(datos.messagge)
					} else {
						toast.success(datos.success)
						setStore({
							registerUser: {
								email: "",
								password: ""
							}
						})
					}
				}).catch(error => console.log(error))
			},

			handleChangeRegister: (e) => {
				const { registerUser } = getStore()
				/* En la siguiente destructuración la variable name se le asigna los valores del evento onChange en el fomulario.*/
				const { name, value } = e.target
				/* name es el atributo de las etiquetas inputs del formualrio. 
				Es una variable programada en la que el nombre de la variable pasa a ser el nombre del atributo de la etiqueta.
				Por lo tanto, sus valores son email y password de los atributos name */
				registerUser[name] = value
				setStore({
					registerUser: registerUser
				})
			},

			handleSubmitLogin: (e) => {
				e.preventDefault()

				const { loginUser, dominio } = getStore()
				const { getFetch } = getActions()

				/* URL a acceder */
				const url = `${dominio}/api/login`
				/* Transforma los datos en string */
				const raw = JSON.stringify(loginUser)
				/* Crea las opciones de la petición */
				const solicitud = {
					method: 'POST',
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}

				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.messagge) {
						toast.error(datos.messagge)
					} else {
						toast.success(datos.success)
						setStore({
							loginUser: {
								email: "",
								password: "",
							},

							/* Se setean las siguientes propiedades del store con los datos de usuario 
								cuando hace login para después usarlas en el sessionStorage */
							user: datos.user,
							accessToken: datos.access_token
						})
					}
					/* A continuación acceso al sessionStorage para mantener los datos de usuario mientras navega con su usuario */
					sessionStorage.setItem('access_token', datos.access_token)
					sessionStorage.setItem('user', JSON.stringify(datos.user))/* user es un diccionario en la tabla por lo tanto debe ser covertido en string*/
				}).catch(error => console.log(error))
			},

			handleChangeLogin: (e) => {
				const { loginUser } = getStore()
				/* En la siguiente destructuración la variable name se le asigna los valores del evento onChange en el fomulario.*/
				const { name, value } = e.target
				/* name es el atributo de las etiquetas inputs del formualrio. 
				Es una variable programada en la que el nombre de la variable pasa a ser el nombre del atributo de la etiqueta.
				Por lo tanto, sus valores son email y password de los atributos name */
				loginUser[name] = value
				setStore({
					loginUser: loginUser
				})
			},

			getFetch: (url, solicitud) => {
				return fetch(url, solicitud)
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
	
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;


