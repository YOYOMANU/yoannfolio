import { ComponentProps } from "react"
import { SelectTrigger } from "./select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

export type SelectOption = {
  label: string
  value: string
}

type Props = {
  items: SelectOption[]
  placeholder?: string
  name?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
} & Omit<ComponentProps<typeof SelectTrigger>, "onChange">

export function SelectWithItems({
  items,
  placeholder,
  name,
  defaultValue,
  value,
  onValueChange,
  ...props
}: Props) {
  return (
    <Select name={name} defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <SelectTrigger {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}