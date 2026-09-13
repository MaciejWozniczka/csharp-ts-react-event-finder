import type {
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import type { DateTimePickerProps } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<DateTimePickerProps, "value" | "onChange" | "slotProps">;

export default function DateTimeInput<T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  });
  return (
    <DateTimePicker
      {...props}
      ampm={false}
      value={field.value ?? null}
      onChange={(value) => field.onChange(value ?? null)}
      sx={{ width: "100%" }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
}
