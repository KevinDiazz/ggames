import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
export default function MyGames({ myGamesList, setMyGameList, setVisible }) {
  const [valorListaJuego, setValorListaJuego] = useState("jugado"); //estado para controlar el diseño al hacer click
  return (
    <div className="fixed inset-0 z-40 bg-[#383939] bg-opacity-50 flex items-center justify-center">
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-5/6 border-t-8 border-b-8 border-e-6 border-l-2 game-case border-[#2b89f4] z-50 mt-10 sm:w-lg md:w-lg">
        <CardHeader className="border-b-3 border-black">
          <CardTitle className="mb-2 text-3xl flex justify-between font-lora">
            <p className="">Mi GGames</p>
            <button
              onClick={() => {
                setVisible(false); //manejar visibilidad
              }}
              className="-mt-8 -me-6 justify-self-end hover:cursor-pointer"
            >
              <img
                className="w-5 float-right mr-3 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                src="/assets/eliminar.png"
              ></img>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0 p-0 h-full">
          <div className="flex items-center mb-2">
            <div
              onClick={() => setValorListaJuego("jugado")}
              className={`bg-[#AED581] hover:bg-[#bddb9a] hover:cursor-pointer m-0 p-1 -mt-6 w-1/3 text-center transition-all duration-200
      ${
        valorListaJuego === "jugado"
          ? "ring-2 ring-green-700 font-bold scale-101 shadow-lg"
          : ""
      }
    `}
            >
              Jugado
            </div>
            <div
              onClick={() => setValorListaJuego("pendiente")}
              className={`bg-[#FFF176] hover:bg-[#fff7af] hover:cursor-pointer m-0 p-1 -mt-6 w-1/3 text-center transition-all duration-200
      ${
        valorListaJuego === "pendiente"
          ? "ring-2 ring-yellow-500 font-bold scale-101 shadow-lg"
          : ""
      }
    `}
            >
              Pendiente
            </div>
            <div
              onClick={() => setValorListaJuego("jugando")}
              className={`bg-[#E573C3] hover:bg-[#ff9ae1] hover:cursor-pointer m-0 p-1 -mt-6 w-1/3 text-center transition-all duration-200
      ${
        valorListaJuego === "jugando"
          ? "ring-2 ring-pink-500 font-bold scale-101 shadow-lg"
          : ""
      }
    `}
            >
              Jugando
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full p-1   overflow-y-scroll">
            <AnimatePresence>
              {valorListaJuego === "jugado"
                ? myGamesList.jugados.map(
                    (
                      val,
                      index //iteracion por myGamesList
                    ) => (
                      <motion.div
                        key={val}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                        className="bg-[#cfcfcf6b] rounded-xl p-2.5 flex gap-4 items-center mb-2"
                      >
                        <p className="w-full font-rajdhani font-medium text-xl">
                          {val}
                        </p>
                        <button
                          className="max-w-6 max-h-6 hover:cursor-pointer"
                          onClick={() =>
                            setMyGameList((prev) => ({
                              //actualizacion de myGamesList
                              ...prev,
                              jugados: prev.jugados.filter(
                                (name) => name !== val
                              ),
                            }))
                          }
                        >
                          <img
                            className="w-8 object-contain"
                            src="/assets/icons8-basura-24.png"
                            alt="Eliminar"
                            title="Eliminar Juego de jugado"
                          />
                        </button>
                      </motion.div>
                    )
                  )
                : null}
            </AnimatePresence>
            <AnimatePresence>
              {valorListaJuego === "pendiente"
                ? myGamesList.pendientes.map((val, index) => (
                    <motion.div
                      key={val}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                      className="bg-[#cfcfcf6b] rounded-xl p-2.5 flex gap-4 items-center mb-2"
                    >
                      <p className="font-rajdhani font-medium text-xl w-full">
                        {val}
                      </p>
                      <button
                        className="max-w-6 max-h-6 hover:cursor-pointer"
                        onClick={() =>
                          setMyGameList((prev) => ({
                            ...prev,
                            pendientes: prev.pendientes.filter(
                              (name) => name !== val
                            ),
                            jugando: prev.jugando.includes(val)
                              ? prev.jugando
                              : [...prev.jugando, val],
                          }))
                        }
                      >
                        <img
                          className="object-contain bg-[#E573C3] rounded-full"
                          src="/assets/icons8-más-100.png"
                          title="Pasar juego a jugando"
                        ></img>
                      </button>
                      <button
                        className="max-w-6 max-h-6"
                        onClick={() =>
                          setMyGameList((prev) => ({
                            ...prev,
                            pendientes: prev.pendientes.filter(
                              (name) => name !== val
                            ),
                          }))
                        }
                      >
                        <img
                          className="w-8 object-contain hover:cursor-pointer"
                          src="/assets/icons8-basura-24.png"
                          title="Eliminar Juego de pendiente"
                        ></img>
                      </button>
                    </motion.div>
                  ))
                : null}
            </AnimatePresence>
            <AnimatePresence>
              {valorListaJuego === "jugando"
                ? myGamesList.jugando.map((val, index) => (
                    <motion.div
                      key={val}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                      className="bg-[#cfcfcf6b] rounded-xl p-2.5 flex gap-4 items-center mb-2"
                    >
                      <p className="w-full font-rajdhani font-medium text-xl">
                        {val}
                      </p>
                      <button
                        className="max-w-6 max-h-6 hover:cursor-pointer"
                        onClick={() =>
                          setMyGameList((prev) => ({
                            ...prev,
                            jugando: prev.jugando.filter(
                              (name) => name !== val
                            ),
                            jugados: prev.jugados.includes(val)
                              ? prev.jugados
                              : [...prev.jugados, val],
                          }))
                        }
                      >
                        <img
                          className="object-contain bg-[#bddb9a] rounded-full hover:cursor-pointer"
                          src="/assets/icons8-más-100.png"
                          title="Pasar juego a jugado"
                        ></img>
                      </button>
                      <button
                        className="max-w-6 max-h-6"
                        onClick={() =>
                          setMyGameList((prev) => ({
                            ...prev,
                            jugando: prev.jugando.filter(
                              (name) => name !== val
                            ),
                          }))
                        }
                      >
                        <img
                          className="w-8 object-contain hover:cursor-pointer"
                          src="/assets/icons8-basura-24.png"
                          title="Eliminar juego de jugando"
                        ></img>
                      </button>
                    </motion.div>
                  ))
                : null}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
