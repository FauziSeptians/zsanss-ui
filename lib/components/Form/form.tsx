/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "@/utils/classNames";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  UseFormProps,
  Path,
} from "react-hook-form";
import { TypeOf, ZodType } from "zod";

/**
 * Context untuk distribusi state React Hook Form ke sub-komponen.
 */
const FormContext = createContext<UseFormReturn<any> | null>(null);

/**
 * Hook internal untuk mengakses context form.
 */
function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("Sub-komponen Form harus berada di dalam <Form />");
  return context;
}

// --- Types ---

/**
 * Properti utama untuk komponen Form Root.
 * Menggunakan ZodType<any, any, any> untuk kompatibilitas penuh dengan zodResolver.
 */
interface FormProps<T extends ZodType<any, any, any>> {
  /** Skema Zod yang mendefinisikan struktur dan aturan validasi data. */
  schema: T;
  /** Fungsi callback yang dipanggil saat data form valid dan disubmit. */
  onSubmit: SubmitHandler<TypeOf<T>>;
  /** Konten form, bisa berupa React Node atau render function. */
  children: React.ReactNode | ((methods: UseFormReturn<TypeOf<T>>) => React.ReactNode);
  /** Konfigurasi tambahan untuk useForm (misal: defaultValues, mode). */
  options?: UseFormProps<TypeOf<T>>;
  /** Class CSS tambahan untuk elemen <form>. */
  className?: string;
}

interface BaseFieldProps<TFieldValues extends FieldValues> {
  /** Nama field yang harus sesuai dengan key di dalam skema Zod. */
  name: Path<TFieldValues>;
  /** Label teks di atas field. */
  label?: string;
  /** Class CSS tambahan untuk container field. */
  className?: string;
  /** Teks panduan di bawah field. */
  helperText?: string;
}

interface FormInputProps<T extends FieldValues>
  extends BaseFieldProps<T>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {}

interface FormTextAreaProps<T extends FieldValues>
  extends BaseFieldProps<T>,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  /** Jumlah baris textarea. Default: 4. */
  rows?: number;
}

// --- Components ---

/**
 * Sub-komponen Input yang Type-Safe.
 */
export function FormInput<T extends FieldValues>({
  name,
  label,
  className,
  helperText,
  ...props
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        {...register(name)}
        {...props}
        className={classNames(
          "border p-2 rounded-md transition-all focus:ring-2 focus:ring-blue-500 outline-none",
          error ? "border-red-500 bg-red-50" : "border-gray-300",
          className
        )}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
      {helperText && !error && (
        <span className="text-xs text-gray-400">{helperText}</span>
      )}
    </div>
  );
}

/**
 * Sub-komponen TextArea yang Type-Safe.
 */
export function FormTextArea<T extends FieldValues>({
  name,
  label,
  className,
  rows = 4,
  ...props
}: FormTextAreaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <textarea
        {...register(name)}
        {...props}
        rows={rows}
        className={classNames(
          "border p-2 rounded-md transition-all focus:ring-2 focus:ring-blue-500 outline-none resize-none",
          error ? "border-red-500 bg-red-50" : "border-gray-300",
          className
        )}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

/**
 * Komponen Utama Form Handler (Agnostic).
 * Mengintegrasikan React Hook Form dan Zod secara deklaratif.
 */
export default function FormRoot<T extends ZodType<any, any, any>>({
  schema,
  onSubmit,
  children,
  options,
  className,
}: FormProps<T>) {
  // Kita menggunakan TypeOf<T> untuk memastikan tipe data yang di-handle konsisten
  const methods = useForm<TypeOf<T>>({
    ...options,
    // Menambahkan 'as any' di sini untuk menyelesaikan konflik internal 
    // antara 'input' dan 'output' tipe data Zod di level generic.
    resolver: zodResolver(schema) as any,
  });

  return (
    <FormContext.Provider value={methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {typeof children === "function" 
          ? (children as (methods: UseFormReturn<TypeOf<T>>) => React.ReactNode)(methods) 
          : children}
      </form>
    </FormContext.Provider>
  );
}
