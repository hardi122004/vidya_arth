import { User } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  COUNTRY_OPTIONS,
  CURRENT_ROLE_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
} from "@/data/taxonomy";
import { getCitiesForState, getStatesForCountry } from "@/data/geoData";
import type { ProfileFormState } from "@/types/profile";

interface PersonalInfoSectionProps {
  profile: ProfileFormState;
  onChange: <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => void;
}

export function PersonalInfoSection({ profile, onChange }: PersonalInfoSectionProps) {
  const today = new Date().toISOString().split("T")[0];

  const availableStates = getStatesForCountry(profile.country);
  const hasStateList = availableStates.length > 0;
  const availableCities = getCitiesForState(profile.country, profile.state);
  const hasCityList = availableCities.length > 0;

  const handleCountryChange = (value: string) => {
    onChange("country", value);
    onChange("state", "");
    onChange("city", "");
  };

  const handleStateChange = (value: string) => {
    onChange("state", value);
    onChange("city", "");
  };

  return (
    <SectionCard
      icon={User}
      title="Personal Information"
      description="The basics that anchor your learning identity."
      badge="Required"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="pi-fullName">Full Name</Label>
          <Input
            id="pi-fullName"
            value={profile.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Alex Johnson"
          />
        </div>
        <div>
          <Label htmlFor="pi-username">Username</Label>
          <Input
            id="pi-username"
            value={profile.username}
            onChange={(e) => onChange("username", e.target.value)}
            placeholder="alexjohnson"
          />
        </div>
        <div>
          <Label htmlFor="pi-dob">Date of Birth</Label>
          <Input
            id="pi-dob"
            type="date"
            max={today}
            value={profile.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="pi-gender">Gender (Optional)</Label>
          <Select
            id="pi-gender"
            placeholder="Select gender"
            value={profile.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            {GENDER_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="pi-country">Country</Label>
          <Select
            id="pi-country"
            placeholder="Select country"
            value={profile.country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="pi-state">State</Label>
          {hasStateList ? (
            <Select
              id="pi-state"
              placeholder="Select state"
              value={profile.state}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              {availableStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              id="pi-state"
              value={profile.state}
              onChange={(e) => handleStateChange(e.target.value)}
              placeholder={profile.country ? "Enter your state" : "Select a country first"}
              disabled={!profile.country}
            />
          )}
        </div>
        <div>
          <Label htmlFor="pi-city">City</Label>
          {hasStateList ? (
            <Select
              id="pi-city"
              placeholder={profile.state ? "Select city" : "Select a state first"}
              value={profile.city}
              onChange={(e) => onChange("city", e.target.value)}
              disabled={!profile.state || !hasCityList}
            >
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              id="pi-city"
              value={profile.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder={profile.country ? "Enter your city" : "Select a country first"}
              disabled={!profile.country}
            />
          )}
        </div>
        <div>
          <Label htmlFor="pi-language">Preferred Language</Label>
          <Select
            id="pi-language"
            placeholder="Select language"
            value={profile.preferredLanguage}
            onChange={(e) => onChange("preferredLanguage", e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="pi-role">Current Role (Optional)</Label>
          <Select
            id="pi-role"
            placeholder="Select current role"
            value={profile.currentRole}
            onChange={(e) => onChange("currentRole", e.target.value)}
          >
            {CURRENT_ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="pi-bio">Short Bio (Optional)</Label>
          <textarea
            id="pi-bio"
            value={profile.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            placeholder="Tell your AI tutor a little about yourself..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>
    </SectionCard>
  );
}
