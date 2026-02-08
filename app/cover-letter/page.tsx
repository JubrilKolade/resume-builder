'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirect /cover-letter to /cover-letters (single cover letters route).
 */
export default function CoverLetterRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cover-letters');
  }, [router]);
  return null;
}
