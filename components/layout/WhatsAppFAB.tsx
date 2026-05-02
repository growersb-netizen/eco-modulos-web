'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  const numero = process.env.NEXT_PUBLIC_WA_STEFANIA || '5491168733406'
  const link = `https://wa.me/${numero}?text=${encodeURIComponent('Hola, me interesa consultar por módulos y piscinas')}`

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </motion.div>
  )
}
