import { Testimonial } from '../types';

const sampleTestimonialIds = new Set(['test-1', 'test-2', 'test-3', 'test-4', 'test-5']);
const sampleTestimonialNames = new Set([
  'david h. miller',
  'henrik von klaus',
  'oliver kensington',
  'elena rostova',
  'kawsar mahmud'
]);

export function removeSeededTestimonials(testimonials: Testimonial[]): Testimonial[] {
  if (!Array.isArray(testimonials)) return [];

  return testimonials.filter((testimonial) =>
    !sampleTestimonialIds.has(testimonial.id) &&
    !sampleTestimonialNames.has(testimonial.name.trim().toLowerCase())
  );
}
