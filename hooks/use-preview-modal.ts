import { create } from 'zustand';

import { Product } from '@/types';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => {
   
    set({ isOpen: true, data })
  },
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;