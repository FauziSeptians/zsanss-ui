import { Flex, Text, IconButton } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Flex align="center" justify="between" gap="3" mt="4">
      <Text size="2" color="gray">
        Halaman <Text weight="bold">{currentPage}</Text> dari <Text weight="bold">{totalPages}</Text>
      </Text>
      
      <Flex gap="2">
        <IconButton
          variant="soft"
          color="gray"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          cursor="pointer"
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          variant="soft"
          color="gray"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          cursor="pointer"
        >
          <ChevronRightIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
}