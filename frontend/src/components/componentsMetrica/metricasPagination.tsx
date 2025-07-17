'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface MetricasPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const MetricasPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}: MetricasPaginationProps) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 1) return null;

  const baseButtonClass = "flex items-center justify-center p-2 h-9 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButtonClass = "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1 flex items-center gap-2">
        <button
          className={`${baseButtonClass}`}
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          aria-label="Primeira página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        
        <button
          className={`${baseButtonClass}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <span className="text-sm font-medium mx-2">
          Página {currentPage} de {totalPages}
        </span>
        
        <button
          className={`${baseButtonClass}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        
        <button
          className={`${baseButtonClass}`}
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          aria-label="Última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="hidden sm:flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
          let page;
          if (totalPages <= 5) {
            page = index + 1;
          } else if (currentPage <= 3) {
            page = index + 1;
          } else if (currentPage >= totalPages - 2) {
            page = totalPages - 4 + index;
          } else {
            page = currentPage - 2 + index;
          }
          
          return (
            <button
              key={page}
              className={`${baseButtonClass} w-9 ${currentPage === page ? activeButtonClass : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Ir para página ${page}`}
            >
              {page}
            </button>
          );
        })}
        
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="px-2 text-sm">...</span>
        )}
        
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <button
            className={`${baseButtonClass} w-9`}
            onClick={() => onPageChange(totalPages)}
            aria-label={`Ir para página ${totalPages}`}
          >
            {totalPages}
          </button>
        )}
      </div>
    </div>
  );
};