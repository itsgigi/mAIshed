import CardSwap, { Card } from "../components/CardSwap"
import InputMessage from "../components/library/ui/InputMessage"
import Message from "../components/library/ui/Message"
import { FiMessageCircle, FiSend } from "react-icons/fi"
import UiElement from "../components/library/Element"
import BlinkinDot from "../components/library/ui/BlinkinDot"
import { FaCircleDot } from "react-icons/fa6"
import SpotlightCard from "../components/ui/SpotlightCard"

const Homepage = () => {
  return (
    <div style={{ position: 'relative' }} className="overflow-hidden h-screen w-screen ">
      <div className="relative w-full h-full flex items-center xl:justify-center text-gray-800">
        <SpotlightCard className="custom-spotlight-card mx-4 xl:mx-0" spotlightColor="rgba(84, 181, 255, 0.5)">
          <div className="flex flex-col">
            <span className="text-4xl xl:text-5xl">AI HAS NEVER BEEN EASIER</span>
            <span className="text-2xl xl:text-3xl text-gray-500">Thanks to lots of useful tools in this shed.</span>
          </div>
        </SpotlightCard>
      </div>
      <CardSwap
        verticalDistance={70}
        delay={5000}
        cardDistance={50}
        pauseOnHover={false}
      >
        <Card>
          <div className="p-4 flex gap-4 items-center"> 
            <FiMessageCircle />
            <span>Message Component</span>
          </div>
          <div className="flex justify-center items-center h-full w-full bg-white">
          <UiElement
            title="Message"
            code="const notifications = ['New message', 'System update']"
            component={Message}
            defaultProps={{
              message: 'Test messagge',
              showTime: true,
              hidden: true
            }}
          />
          </div>
        </Card>
        <Card>
          <div className="p-4 flex gap-4 items-center"> 
            <FiSend />
            <span>Input Component</span>
          </div>
          <div className="flex justify-center items-center h-full w-full bg-white">
          <UiElement
            title="Input Message"
            code="const notifications = ['New message', 'System update']"
            component={InputMessage}
          />
          </div>
        </Card>
        <Card>
          <div className="p-4 flex gap-4 items-center"> 
            <FaCircleDot />
            <span>Blinkin Dot</span>
          </div>
          <div className="flex justify-center items-center h-full w-full bg-white">
          <UiElement
            title="Blinkin Dot"
            code="const notifications = ['New message', 'System update']"
            component={BlinkinDot}
          />
          </div>
        </Card>
      </CardSwap>
    </div>
  )
}

export default Homepage