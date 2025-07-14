import { Slider } from "radix-ui";
import { useState } from "react";
import { motion } from "motion/react"

export const SliderTest = ({className}: {className?: string}) => {
  
  const [valueCurrent, setValueCurrent] = useState(0);
  
  return (<form>
      <Slider.Root className={"relative flex items-center select-none touch-none w-[200px] h-[20px]"} defaultValue={[ 0 ]} max={100} step={1} onValueChange={value => setValueCurrent(value[0])}>
        <Slider.Track className={"bg-primary-900 relative grow rounded-[9999px] h-[5px]"}>
          <Slider.Range className={"absolute bg-primary-500 rounded-[9999px] h-[100%]"}/>
        </Slider.Track>
        <Slider.Thumb className={"block w-[20px] h-[20px] bg-primary-500 rounded-3xl hover:bg-primary-700"}
                      aria-label="Volume" asChild>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileDrag={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 3 },
            }}
          >
            <span>
              <span
                className="absolute bottom-[100%] left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-primary-500 text-white rounded-sm text-xs"
                style={{ left: `calc(${valueCurrent}%) - 10px` }}
              >
                {valueCurrent}
              </span>
            </span>
          </motion.div>
        </Slider.Thumb>
      </Slider.Root>
    </form>
  );
}
