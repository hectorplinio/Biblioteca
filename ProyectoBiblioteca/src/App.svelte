<script>
	import { db } from "./firebase";
	import {
		collection,
		getDocs,
		doc,
		addDoc,
		updateDoc,
		deleteDoc,
	} from "firebase/firestore";
	let libro = {
		Id: "",
		Nombre: "",
		Autor: "",
		FechaEdicion: "",
		Genero: "",
		Imagen: "",
		Npaginas: "",
		Precio: "",
	};
	let libros = [];

	const loadData = async () => {
		const querySnapshot = await getDocs(collection(db, "libros"));
		let libs = [];
		querySnapshot.forEach((doc) => {
			libs.push({ ...doc.data(), id: doc.id });
		});
		libros = [...libs];
		console.log(libros);
	};
	loadData();

	let editar = false;

	const vaciarFormulario = () => {
		libro = {
			Id: "",
			Nombre: "",
			Autor: "",
			FechaEdicion: "",
			Genero: "",
			Imagen: "",
			Npaginas: "",
			Precio: "",
		};
		editar = false;
	};
	const añadirElemento = async () => {
		await addDoc(collection(db, "libros"), libro);
		await loadData();
		vaciarFormulario();
	};

	const guardarElemento = async () => {
		await updateDoc(doc(db, "libros", libro.id), libro);
		await loadData();
		vaciarFormulario();
	};

	const editarElemento = (p) => {
		libro = Object.assign({}, p);
		editar = true;
	};

	const eliminarElemento = async (id) => {
		await deleteDoc(doc(db, "libros", id));
		await loadData();
	};

	// Handler principal
	const onSubmitHandler = (e) => {
		if (editar) {
			// Guardamos
			console.log("Guardando...");
			guardarElemento();
		} else {
			añadirElemento();
		}
	};
</script>

<main>
	<div class="container mx-auto">
		<!-- Grid de 2 Columnas con una separación 4 (1rem) -->
		<div class="grid grid-cols-2 gap-4">
			<!-- Listado de Elementos-->
			<div class="bg-gray-100 grid grid-cols-1 gap-6">
				{#each libros as p, i}
					<!-- Elemento -->
					<div
						class="bg-white rounded-lg sahdow-lg overflow-hidden border m-1 flex flex-col md:flex-row"
					>
						<div
							class="w-full mx-2 h-80 bg-gray-100 rounded-md p-2 my-2"
						>
							{#if p.Imagen}
								<img
									class="object-center object-contain w-full h-full"
									src={p.Imagen}
									alt="thumbnail"
									style="height: 300px;width: 300px;"
								/>
							{:else}
								<img
									class="object-center object-contain w-full h-full"
									src="images/no-product.jpg"
									alt="thumbnail"
								/>
							{/if}
						</div>
						<div
							class="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2"
						>
							<p class="text-xl text-gray-700 font-bold">
								Nombre: {p.Nombre}
							</p>
							<p class="text-base text-gray-400 font-normal">
								Género: {p.Genero}
							</p>
							<p class="text-base text-gray-400 font-normal">
								Fecha Edición: {p.FechaEdicion}
							</p>
							<p class="text-base text-gray-400 font-normal">
								Nº Págimas; {p.Npaginas}
							</p>
							<p class="text-base text-gray-400 font-normal">
								Precio Venta: {p.Precio}
							</p>
							<div class="flex justify-start space-x-2">
								<button
									class="ml-5 bg-blue-200 py-1 px-2 border border-blue-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-blue-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:text-gray-700 focus:bg-blue-200"
									on:click={editarElemento(p)}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
								</button>
								<button
									class="ml-5 bg-red-200 py-1 px-2 border border-red-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-red-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-300 focus:text-gray-700 focus:bg-red-200"
									on:click={eliminarElemento(p.id)}
									><svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<!-- Fin elemento -->
				{/each}
			</div>
			<!-- FIN Listado de Elementos-->
			<!-- Caja principal formulario-->
			<div class="p-4 shadow-md rounded-md text-left">
				<!-- on:evento cuando se envie el formulario-->
				<form on:submit|preventDefault={onSubmitHandler}>
					<!-- bind:value=variable cada cambio del input se sincorniza con la variable previamente declarada en el código -->
					<label for="nombre">Nombre del libro: </label>
					<input
						bind:value={libro.Nombre}
						id="nombre"
						type="text"
						placeholder="Nombre del libro"
					/>
					<label for="descripcion">Autor del libro: </label>
					<input
						bind:value={libro.Autor}
						id="nombre"
						type="text"
						placeholder="Nombre del autor"
					/>
					<label for="imagen-url">Imagen del libro: </label>
					<input
						bind:value={libro.Imagen}
						type="url"
						id="imagen-url"
						placeholder=""
					/>
					<label for="Npaginas">Nº de páginas: </label>
					<input
						bind:value={libro.Npaginas}
						type="text"
						id="Npaginas"
						placeholder="Nº d páginas"
					/>
					<label for="FechaEdicion">Fecha de lanzamiento: </label>
					<input
						bind:value={libro.FechaEdicion}
						type="text"
						id="FechaEdicion"
						placeholder="Año de lanzamiento"
					/>
					<label for="Precio">Precio de venta: </label>
					<input
						bind:value={libro.Precio}
						type="text"
						id="Precio"
						placeholder="Precio"
					/>
					<label for="Genero">Genero</label>
					<select bind:value={libro.Genero} id="Genero">
						<option value="Novela">Novela</option>
						<option value="Drama">Drama</option>
						<option value="Romantica">Romantica</option>
						<option value="Policiaca">Policiaca</option>
						<option value="Juvenil">Juvenil</option>
						<option value="Historica">Historica</option>
						<option value="Belica">Belica</option>
					</select>
					<hr class="my-2" />
					<!-- Este boton debe de ser dual, si se añade o se modifica un elemento cambiara tanto el contenido como la función a la que va a llamar o a ejecutar...-->
					{#if editar}
						<button
							class="ml-5 bg-indigo-200 py-2 px-3 border border-indigo-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:text-gray-700 focus:bg-indigo-200 flex items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
								/>
							</svg>
							Editar
						</button>
					{:else}
						<button
							class="ml-5 bg-green-200 py-2 px-3 border border-green-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-green-500 hover:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-green-300 focus:text-gray-700 focus:bg-green-200  flex items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							Añadir
						</button>
					{/if}
				</form>
			</div>
			<!-- Fin Caja principal formulario-->
		</div>
		<!-- FIN Grid de 2 Columnas-->
	</div>
	<!-- FIN Container APP-->
</main>

<style>
</style>