import { useState } from "react";
import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyGames from "./myGames";
import getIcons from "@/utils/asignarIcono";
import { toast } from "sonner";
export default function GameList({ setMyGameList, data, loading, error }) {
  const [selectedImage, setSelectedImage] = useState(null); //Estado para guardar la url de la imagen para ampliarla y mostrarla en Dialog
  return (
    <>
      <div className="w-full flex gap-4">
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data && data.results && data.results.length && !error > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.8,
              ease: "linear",
            }}
          >
            <Accordion
              className="w-sm md:w-md lg:w-lg xl:w-xl"
              type="single"
              collapsible
            >
              {data.results.map(
                (
                  game //iteracion de los datos de la API
                ) => (
                  <AccordionItem
                    value={game.id}
                    key={game.id}
                    className="border-[#15b400] border-y-1 mt-1  bg-[#ffffff]"
                  >
                    <AccordionTrigger className="flex justify-center items-center">
                      <img
                        className="max-w-1/3 min-w-1/3 h-35 object-cover object-top"
                        loading="lazy"
                        src={game.background_image}
                      ></img>
                      <div className="flex flex-col w-full">
                        <span className="text-[#97CA43] rounded text-4xl  md:text-4xl">
                          {Number(game.rating).toFixed(1)}
                        </span>
                        <p className="text-lg w-full md:text-xl font-rajdhani font-semibold overflow-hidden">
                          {game.name}
                        </p>

                        <div>
                          {game.genres.map((val) => (
                            <Badge
                              className="h-5 mt-2 me-1 bg-white border-[#ef8630] text-[#686868]"
                              variant="outline"
                              key={val.name + game.id}
                            >
                              {val.name}
                            </Badge>
                          ))}
                        </div>
                        <div>
                          {game.parent_platforms.map((val) => {
                            if (
                              val.platform.name != "Linux" &&
                              val.platform.name != "Apple Macintosh" &&
                              val.platform.name != "Web" &&
                              val.platform.name != "SEGA" &&
                              val.platform.name != "Atari" &&
                              val.platform.name != "Commodore / Amiga" &&
                              val.platform.name != "3DO"
                            ) {
                              return (
                                <Badge
                                  className="w-10 mt-2 h-13 p-1 border-[#707cc0] me-1 bg-white md:w-13"
                                  variant="outline"
                                  key={val.platform.name + game.id}
                                >
                                  <img
                                    className="object-contain p-1"
                                    loading="lazy"
                                    src={getIcons(val.platform.name)}
                                  ></img>
                                </Badge>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex  justify-center">
                        <p className="font-semibold font-mono">
                          Añade el Juego a tu carpeta de GGames
                        </p>
                      </div>
                      <div className="flex justify-center gap-8 mb-5">
                        <button
                          aria-label={`Marcar como jugado: ${game.name}`}
                          className="w-44 flex flex-col items-center justify-center gap-2 p-2   h-22  rounded-xl"
                          onClick={() => {
                            setMyGameList((prev) => ({
                              //Añadir datos para carpeta GGames
                              ...prev,
                              jugados: prev.jugados.includes(game.name)
                                ? prev.jugados
                                : [...prev.jugados, game.name],
                            }));
                            toast(`${game.name} ha sido añadido a Mis GGames`, {
                              style: {
                                color: "black",
                                border: "2px solid",
                                borderColor: "#AED538",
                                backgroundColor: "white",
                                borderWidth: "3px",
                              },
                              className:
                                "text-lg font-semibold border-2 border-green-700 shadow-md",
                              icon: "🎮",
                            });
                          }}
                        >
                          <p className="font-light text-md">Jugado</p>
                          <img
                            className="w-6 h-6 object-contain bg-[#AED581] hover:bg-[#bddb9a] hover:cursor-pointer rounded-full"
                            src="/assets/icons8-más-100.png"
                            loading="lazy"
                          ></img>
                        </button>
                        <button
                          aria-label={`Marcar como pendiente: ${game.name}`}
                          className="w-44 h-22 justify-center flex-col flex items-center gap-2 p-2  rounded-xl"
                          onClick={() => {
                            setMyGameList((prev) => ({
                              ...prev,
                              pendientes: prev.pendientes.includes(game.name)
                                ? prev.pendientes
                                : [...prev.pendientes, game.name],
                            }));
                            toast(`${game.name} ha sido añadido a Mis GGames`, {
                              style: {
                                color: "black",
                                border: "2px solid",
                                borderColor: "#FFF176",
                                backgroundColor: "white",
                                borderWidth: "3px",
                              },
                              className:
                                "text-lg font-semibold border-2 border-green-700 shadow-md",
                              icon: "🎮",
                            });
                          }}
                        >
                          <p className="font-light text-md">Pendiente</p>
                          <img
                            className="w-6 h-6 bg-[#FFF176] hover:bg-[#fff7af] hover:cursor-pointer rounded-full"
                            src="/assets/icons8-más-100.png"
                          ></img>
                        </button>
                        <button
                          aria-label={`Marcar como jugando: ${game.name}`}
                          className="w-44 h-22 justify-center flex-col flex items-center gap-2 p-2  rounded-xl"
                          onClick={() => {
                            setMyGameList((prev) => ({
                              ...prev,
                              jugando: prev.jugando.includes(game.name)
                                ? prev.jugando
                                : [...prev.jugando, game.name],
                            }));
                            toast(`${game.name} ha sido añadido a Mis GGames`, {
                              style: {
                                color: "black",
                                border: "2px solid",
                                borderColor: "#E573C3",
                                textAlign: "center",
                                backgroundColor: "white",
                                borderWidth: "3px",
                              },
                              className:
                                "text-lg font-semibold  shadow-md text-center",
                              icon: "🎮",
                            });
                          }}
                        >
                          <p className="font-light text-md">Jugando</p>
                          <img
                            className="w-6 h-6 bg-[#E573C3] hover:bg-[#ff9ae1] hover:cursor-pointer rounded-full"
                            src="/assets/icons8-más-100.png"
                          ></img>
                        </button>
                      </div>
                      <Carousel
                        opts={{
                          align: "start",
                          slidesToScroll: 2,
                        }}
                        className="max-w-xl mx-auto relative"
                      >
                        <CarouselPrevious className=" !opacity-100" />
                        <CarouselNext className="!opacity-100" />
                        <CarouselContent className="flex gap-4">
                          {game.short_screenshots
                            ? game.short_screenshots.map((val, index) => (
                                <CarouselItem key={index} className="basis-1/3">
                                  <div className="">
                                    <Card className="p-0 m-0">
                                      <CardContent className="p-0 m-0">
                                        <img
                                          className="w-full h-full object-cover hover:cursor-zoom-in"
                                          src={val.image}
                                          alt={`Screenshot ${index + 1}`}
                                          loading="lazy"
                                          onClick={() =>
                                            setSelectedImage(val.image)
                                          }
                                        />
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))
                            : null}
                        </CarouselContent>
                      </Carousel>
                      <Dialog
                        open={!!selectedImage}
                        onOpenChange={() => setSelectedImage(null)}
                      >
                        {selectedImage && (
                          <DialogContent className="sm:max-w-[825px] p-10 bg-[#38342f] text-white">
                            <DialogTitle className="text-[#3ab949]">
                              {game.name}
                            </DialogTitle>
                            <img
                              className="w-full max-h-[600px] object-contain"
                              src={selectedImage}
                            />
                          </DialogContent>
                        )}
                      </Dialog>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </motion.div>
        ) : null }
      </div>
    </>
  );
}
