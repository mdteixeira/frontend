import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner";

import { buscar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Categoria from "../../../models/Categoria";

function DeletarCategorias() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria) 

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    Authorization: token
                }
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
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() { 
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            alert('Apagado com sucesso')

        } catch (error) {
            alert('Erro ao apagar a Categoria')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o Categoria?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Categoria
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nomeCategoria}</p>

                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tipo
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.tipo}</p>

                <div className="flex">

                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>

                    <button
                        className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 
                            flex items-center justify-center'
                        onClick={deletarCategoria}>

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>

                </div>
            </div>
        </div>
    )
}
export default DeletarCategorias
