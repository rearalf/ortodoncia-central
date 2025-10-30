export const CreateAppointmentBreadCrumbs = (
  patientName: string,
  id: string
): ILink[] => [
  {
    link_name: "Inicio",
    link_to: "/",
  },
  {
    link_name: `Paciente ${patientName}`,
    link_to: `/home/patient-profile/${id}`,
  },
  {
    link_name: "Nueva cita",
    link_to: "/",
  },
];
