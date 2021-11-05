<script>
	import Modal from "./Modal.svelte";
	let modal;
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { toast } from '@zerodevx/svelte-toast';
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
	let generos = [];

	let genero = "";
	
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
	const loadDataGeneros = async () => {
		const querySnapshot = await getDocs(collection(db, "generos"));
		let gener = [];
		querySnapshot.forEach((doc) => {
			gener.push({ ...doc.data(), id: doc.id });
		});
		generos = [...gener];
		console.log(generos);
	};
	loadDataGeneros();

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
	const añadirElementoGenero = async () => {
		await addDoc(collection(db, "generos"), {genero:genero});
		await loadDataGeneros();
	};

	const guardarElemento = async () => {
		await updateDoc(doc(db, "libros", libro.id), libro);
		await loadData();
		vaciarFormulario();
	};
	const guardarElementoGenero = async () => {
		await updateDoc(doc(db, "generos", genero.id), );
		await loadDataGeneros();
	};

	const editarElemento = (p) => {
		libro = Object.assign({}, p);
		editar = true;
		
	};

	const eliminarElemento = async (id) => {
		await deleteDoc(doc(db, "libros", id));
		await loadData();
	};
	const success = () =>{
		toast.push('Genero añadido correctamente!', {
		theme: {
			'--toastBackground': '#48BB78',
			'--toastBarBackground': '#2F855A'
		}
		})
	}
	const editElement = () =>{
		toast.push('Elemento editado correctamente!', {
		theme: {
			'--toastBackground': '#FFFACD',
			'--toastBarBackground': '#F0E68C',
			'--toastColor': 'red'
		}
		})
	}

	// Handler principal
	const onSubmitHandler = (e) => {
		if (editar) {
			// Guardamos
			console.log("Guardando...");
			guardarElemento();
			editElement();
		} else {
			añadirElemento();
		}
	};
	const onSubmitHandlerGenero = () => {
		console.log(genero);
		añadirElementoGenero();
		success();
		modal.hide()
		
	};
</script>

<main>
	<SvelteToast  />
	<div class="cabecera">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img src="https://mcgtn.org/storage/logos/library-logo.png" class="icono">
		<div class="titulo"><h1>Bibliomanía</h1></div>
	</div>
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
					{#each generos as g}
						<option value='{g.genero}'>{g.genero}</option>
					{/each}
				</select>
				<input type="button" on:click={() => modal.show()} value="Agregar"class="agregar"  >
				<Modal bind:this={modal}>
					<form on:submit|preventDefault={onSubmitHandlerGenero}>
						<h2>Añadir un nuevo género</h2>
						<input type="text" name="genero" id="genero" bind:value={genero}>
						<button value="Añadir">Añadir</button>	
					</form>
					<br><button on:click={() => modal.hide()}>Close</button>
					</Modal>
				
				<hr class="" />
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
					<div class="libro">
							{#if p.Imagen}
								<img
									class="portadas"
									src={p.Imagen}
									alt="thumbnail"
									style=""
								/>
							{:else}
								<img
									class=""
									src="images/no-product.jpg"
									alt="thumbnail"
								/>
							{/if}
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
								<button class="editar" on:click={editarElemento(p)} value="Editar" name="Editar">Editar</button>
								<button class="eliminar" on:click={eliminarElemento(p.id)} value="Eliminar" name="Eliminar">Eliminar</button>
					</div>
				{/each}
			</div>
	</div>
	<!-- FIN Container APP-->
</main>
 
<style>
</style>