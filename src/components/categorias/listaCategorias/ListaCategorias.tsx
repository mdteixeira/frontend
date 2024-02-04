import {useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Categoria from "../../../models/Categoria"
import { AuthContext } from "../../../contexts/AuthContext"
import { DNA } from "react-loader-spinner"
import CardCategoria from "../cardcategoria/CardCategoria"
import { buscar } from "../../../services/Service"

function ListaCategorias(){
    const navigate = useNavigate()

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    return (
        <>
        {categorias.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
        />
        )}
            <div className="flex justify-center w-full my-1">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12">
                        <>
                            {categorias.map((categoria) => (
                                <>
                                    <CardCategoria key={categoria.id} categoria={categoria} />
                                </>
                            ))}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaCategorias

