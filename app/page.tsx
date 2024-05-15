"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { changeTest } from "@/lib/redux/slices/componentSlice";
import { selectComponents } from "@/lib/redux/store";

export default function Home() {

  const { Test } = useAppSelector(selectComponents)
  const dispatch = useAppDispatch()

  return (
    // <>Test</>
    <div>
      {Test}
      <button onClick={() => dispatch(changeTest({newText: "Changed Text"}))}>Change</button>
    </div>
  );
}
