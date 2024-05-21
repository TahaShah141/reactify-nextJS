import { ComponentType, ForeignComponentType } from "@/lib/types"
import { useEffect } from "react"
import { useAppDispatch } from "../redux/hooks"
import { copySelected, deleteSelected, pasteIntoSelected } from "../redux/slices/projectSlice"

export const useSelectedListeners = (component: ComponentType | ForeignComponentType | undefined) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const deleteComponentOnDelete = (e: KeyboardEvent) => {
      if (e.key === "Delete" && component) dispatch(deleteSelected())
    }

    window.addEventListener('keydown', deleteComponentOnDelete)

    return () => window.removeEventListener('keydown', deleteComponentOnDelete)
  }, [component, dispatch])


  useEffect(() => {
    const copyComponentOnCtrlC = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c' && component) dispatch(copySelected())
    }

    window.addEventListener('keydown', copyComponentOnCtrlC)

    return () => window.removeEventListener('keydown', copyComponentOnCtrlC)
  }, [component, dispatch])

  useEffect(() => {
    const copyComponentOnCtrlV = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'v' && component) dispatch(pasteIntoSelected())
    }

    window.addEventListener('keydown', copyComponentOnCtrlV)

    return () => window.removeEventListener('keydown', copyComponentOnCtrlV)
  }, [component, dispatch])
}