import RoleExperienceCard from "../components/cards/RoleExperienceCard"

const Experience = () => {
  return (
    <RoleExperienceCard
      role="Software Engineer"
      company="Tech Company"
      date="2024 - Present"
      description={[
        "Led development of key features for the main product, improving user engagement by 20%.",
        "Collaborated with cross-functional teams to design and implement scalable solutions.",
        "Mentored junior developers and conducted code reviews to maintain code quality."
      ]}
      skills={["React", "TypeScript", "Node.js", "Agile", "React", "TypeScript", "Node.js", "Agile", "React", "TypeScript", "Node.js", "Agile"]}
      companyUrl="https://www.linkedin.com/in/keysii/"
      icon={<img src="/company-logo.png" alt="Company Logo" className="w-6 h-6" />}
    />
  )
}

export default Experience