'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  type: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
  maxBedrooms: z.string().optional(),
  dateAdded: z.string().optional(),
  location: z.string().optional(),
})

export default function SearchForm({ onSearch }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAdded: '',
      location: '',
    },
  })

  function onSubmit(values) {
    onSearch(values)
  }

  function onReset() {
    form.reset()
    onSearch({})
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Flat">Flat</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Min Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Min Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Max Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Max Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="minBedrooms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Min Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Min Bedrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxBedrooms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Max Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Max Bedrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="dateAdded"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Added</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={onReset}>Reset</Button>
        </div>
      </form>
    </Form>
  )
}

