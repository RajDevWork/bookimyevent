import { useContext } from "react";
import { EventContext } from "../event.context";
import eventAPI from '../services/event.api'

export const useEvent = ()=>{

    const context = useContext(EventContext)
    const {loading, setLoading,events,setEvents} = context


    const handleGetAllEvents = async()=>{
        setLoading(true)
        const response = await eventAPI.getAllEvents()
        setEvents(response.events)
        setLoading(false)

    }

    const handleGetEventById = async(id)=>{
        setLoading(true)
        const response = await eventAPI.getEventById(id)
        setEvents(response.events)
        setLoading(false)
    }

    const handleGetEventByCategory = async (category)=>{
        setLoading(true)
        const response = await eventAPI.getEventsByCategory(category)
        setEvents(response.events)
        setLoading(false)
    }
    const handleCreateEvent = async (eventData)=>{

        setLoading(true)
        const response = await eventAPI.createEvent(eventData)
        setEvents(response.events)
        setLoading(false)

    }

    const handleSearchEvent = async (query)=>{
        setLoading(true)
        const response = await eventAPI.searchEvents(query)
        setEvents(response.events)
        setLoading(false)
    }

    return {loading,events,handleGetAllEvents,handleGetEventById,handleGetEventByCategory,handleCreateEvent,handleSearchEvent}




}