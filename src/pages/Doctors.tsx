import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doctors, specialties } from "@/data/doctors";
import { Search, Filter, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        doctor.specialty === selectedSpecialty;

      const matchesAvailability = !showAvailableOnly || doctor.available;

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [searchQuery, selectedSpecialty, showAvailableOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find <span className="text-gradient">Doctors</span>
            </h1>
            <p className="text-muted-foreground">
              Search from our network of {doctors.length}+ verified healthcare
              professionals
            </p>
          </div>

          {/* Search & Filters */}
          <div className="gradient-card p-6 rounded-2xl border border-border shadow-md mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search doctors, hospitals, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>

            {/* Specialty Filter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Specialty
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={
                      selectedSpecialty === specialty ? "default" : "outline-light"
                    }
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={cn(
                      "transition-all",
                      selectedSpecialty === specialty && "shadow-primary"
                    )}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Available Toggle */}
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant={showAvailableOnly ? "default" : "outline-light"}
                size="sm"
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className="gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-healthcare-green" />
                Available Today
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{filteredDoctors.length}</strong> doctors
            </p>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No doctors found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Doctors;
