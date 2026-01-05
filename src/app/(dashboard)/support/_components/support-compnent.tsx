import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "1. How do I reset my password?",
    answer:
      "To reset your password, select 'Settings', and then navigate to the 'Security' tab. You will find an option to change your password there.",
  },
  {
    question: "2. Where can I find Report Archives?",
    answer: "To find report archives, you have to select Report History.",
  },
  {
    question: "3. What are the system requirements?",
    answer:
      "Our system supports uploading common file formats such as PDF and image files without any issues. Additionally, if you provide a clear and meaningful prompt or input, the system will process it correctly and return a valid, accurate response. No special hardware or advanced technical setup is required just a stable internet connection and a modern web browser.",
  },
  {
    question: "4. How do I add a new session?",
    answer: "To add a new session, you have to select New Session.",
  },
];

const SupportComponent = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-5 border border-gray-200 rounded-lg">
        <h6 className="text-sm">Contact Support</h6>

        <h1 className="text-2xl font-bold text-primary my-3">Get in Touch</h1>

        <p className="opacity-50">
          For general questions or support, please email us directly. We
          typically respond within 24 hours.
        </p>

        <div className="my-8 flex items-center gap-2 text-primary font-medium">
          <Mail />

          <button>support@healthcare.com</button>
        </div>

        <div className="mt-6">
          <Link href={`mailto:support@healthcare.com0`}>
            <Button className="h-[45px] w-[130px]">Email Us</Button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-primary">
          Frequently Asked Questions
        </h1>

        <div className="mt-5 space-y-5">
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="border border-gray-300 bg-white px-2 rounded-lg"
              >
                <AccordionTrigger className="hover:no-underline text-primary font-semibold text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="opacity-50 font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportComponent;
