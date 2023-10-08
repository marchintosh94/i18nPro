import { useMemoryUsage } from "../hooks/useMemoryUsage";
import Speedometer from "./speedometer/Speedometer"

const Navbar = () => {
  const { memory, totalMemory } = useMemoryUsage(2);

  return (
    <nav className="flex sm:justify-between justify-center flex-wrap h-28">
        <img className="max-h-20 w-24 my-4 hidden sm:block" src="/mb_dark.svg" alt="i18nPro" />
        <img className="max-h-20 w-56 sm:w-72  my-4" src="/i18nPro.png" alt="i18nPro" />
        <Speedometer size={'lg'} range={[0, totalMemory]} value={memory}>
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-xs sm:text-base opacity-80 ">Memory Usage</h4>
            <h3 className="text-sm sm:text-lg font-semibold">{memory}MB</h3>
          </div>
        </Speedometer>
      </nav>
  )
}

export default Navbar