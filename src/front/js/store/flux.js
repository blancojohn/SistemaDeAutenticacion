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

			dominio: "http://127.0.0.1:3001",

			message: null,
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
					if (datos.messagge){
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
					if (datos.messagge){
						toast.error(datos.messagge)
					} else {
						toast.success(datos.success)
						setStore({
							loginUser: {
								email: "",
								password: ""
							}
						})
					}
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

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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

	
