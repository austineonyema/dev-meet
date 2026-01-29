import { Terminal, Settings as SettingsIcon } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-terminal/10 rounded-lg">
          <SettingsIcon className="w-6 h-6 text-terminal" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-text-muted text-sm font-mono mt-1">
            /etc/config/user.conf
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-terminal" />
            Profile Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                Display Name
              </label>
              <input
                type="text"
                className="w-full bg-surface-800 border border-terminal/20 rounded p-2 text-sm focus:border-terminal/50 outline-none"
                defaultValue="Austine Onyema"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                Bio
              </label>
              <textarea
                className="w-full bg-surface-800 border border-terminal/20 rounded p-2 text-sm focus:border-terminal/50 outline-none h-24"
                defaultValue="Full-stack developer building the future."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-terminal" />
            Account Security
          </h2>
          <div className="space-y-4 text-sm text-text-muted">
            <p>Password last changed 30 days ago.</p>
            <button className="px-4 py-2 border border-terminal/20 rounded hover:bg-terminal/10 text-terminal transition-colors w-full font-mono text-xs">
              $ change-password --force
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
