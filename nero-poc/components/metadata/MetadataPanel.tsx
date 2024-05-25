import NFTContext from "@/lib/context/NFTContext";
import { Box, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";
import { useContext } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function MetadataPanel() {
  const context = useContext(NFTContext);
  const columns: GridColDef<(typeof context.traits)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'trait_type',
      headerName: 'Trait',
      width: 150,
      editable: false,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 150,
      editable: true,
    },
    
  ]

  console.log(context.traits);

  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Configure your NFT Metadata
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Typography variant="subtitle1">
        Traits
      </Typography>
      <DataGrid
        rows={context.traits}
        columns={columns}
        processRowUpdate={(newRow, oldRow) => {
          const traits = [...context.traits];
          const trait = traits.find(e=>oldRow.id === e.id);
          if (trait) {
            trait.value = newRow.value;
          }

          context.setTraits(traits)
          return newRow;
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
      />
    </Box>
  </div>
}