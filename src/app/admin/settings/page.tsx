import { adminGetSettings } from "@/backend/actions/admin/settings.actions";
import { SettingsClient } from "@/frontend/components/admin/SettingsClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await adminGetSettings();

  return <SettingsClient settings={settings} />;
}
