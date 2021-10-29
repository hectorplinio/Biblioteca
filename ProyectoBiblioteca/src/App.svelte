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
	<div class="container">
		<div class="formulario">
			<!-- on:evento cuando se envie el formulario-->
			<form on:submit|preventDefault={onSubmitHandler}>
				<!-- bind:value=variable cada cambio del input se sincorniza con la variable previamente declarada en el código -->
				<label for="nombre">Nombre del libro:<br> </label>
				<input
					bind:value={libro.Nombre}
					id="nombre"
					type="text"
					placeholder="Nombre del libro"
				/><br>
				<label for="descripcion">Autor del libro:<br> </label>
				<input
					bind:value={libro.Autor}
					id="nombre"
					type="text"
					placeholder="Nombre del autor"
				/><br>
				<label for="imagen-url">Imagen del libro:<br> </label>
				<input
					bind:value={libro.Imagen}
					type="url"
					id="imagen-url"
					placeholder=""
				/><br>
				<label for="Npaginas">Nº de páginas:<br> </label>
				<input
					bind:value={libro.Npaginas}
					type="text"
					id="Npaginas"
					placeholder="Nº d páginas"
				/><br>
				<label for="FechaEdicion">Fecha de lanzamiento:<br> </label>
				<input
					bind:value={libro.FechaEdicion}
					type="text"
					id="FechaEdicion"
					placeholder="Año de lanzamiento"
				/><br>
				<label for="Precio">Precio de venta:<br> </label>
				<input
					bind:value={libro.Precio}
					type="text"
					id="Precio"
					placeholder="Precio"
				/><br>
				<label for="Genero">Genero<br></label>
				<select bind:value={libro.Genero} id="Genero">
					<option value="Novela">Novela</option>
					<option value="Drama">Drama</option>
					<option value="Romantica">Romantica</option>
					<option value="Policiaca">Policiaca</option>
					<option value="Juvenil">Juvenil</option>
					<option value="Historica">Historica</option>
					<option value="Belica">Belica</option>
				</select><br>
				<hr class="my-2" />
				<!-- Este boton debe de ser dual, si se añade o se modifica un elemento cambiara tanto el contenido como la función a la que va a llamar o a ejecutar...-->
				{#if editar}
					<button class="" value="Editar">
						Editar
					</button>
				{:else}
					<button class="" value="Añadir">
						Añadir
					</button>
				{/if}
			</form>
		</div>
			<div class="libros">
				{#each libros as p, i}
					<!-- Elemento -->
						<div class="" style="">
							{#if p.Imagen}
								<img
									class=""
									src={p.Imagen}
									alt="thumbnail"
									style="height: 300px;width: 300px;"
								/>
							{:else}
								<img
									class=""
									src="images/no-product.jpg"
									alt="thumbnail"
								/>
							{/if}
						</div>
						<div class="">
							<p class="">
								Nombre: {p.Nombre}
							</p>
							<p class="">
								Género: {p.Genero}
							</p>
							<p class="">
								Fecha Edición: {p.FechaEdicion}
							</p>
							<p class="">
								Nº Págimas; {p.Npaginas}
							</p>
							<p class="">
								Precio Venta: {p.Precio}
							</p>
							<div class="">
								<button class="editar"on:click={editarElemento(p)} value="Editar"></button>
								<button class="eliminar" on:click={eliminarElemento(p.id)} value="Eliminar"></button>
							</div>
						</div>
					<!-- Fin elemento -->
				{/each}
			</div>
	</div>
	<!-- FIN Container APP-->
</main>

<style>
</style>