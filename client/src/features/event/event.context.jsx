import { createContext, useState } from "react";

export const EventContext = createContext()

export const EventContextProvider = ({children})=>{

    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])


    return <EventContext.Provider value={{loading,setLoading,events,setEvents}}>
        {children}
    </EventContext.Provider>

}