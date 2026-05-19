import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Person {
  name: string;
  title?: string;
  isManager?: boolean;
}

interface OrgNode {
  title: string;
  headcount: string;
  manager?: Person;
  people?: Person[];
  children?: OrgNode[];
  defaultOpen?: boolean;
}

const OrgNodeComponent: React.FC<{ node: OrgNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(node.defaultOpen || level <= 1);
  
  const hasChildren = node.children && node.children.length > 0;
  const hasPeople = node.people && node.people.length > 0;
  const hasContent = hasChildren || hasPeople;

  const getIndentStyle = (level: number) => {
    return { marginLeft: `${level * 24}px` };
  };

  const getBorderColor = (level: number) => {
    const colors = ['border-blue-200', 'border-green-200', 'border-orange-200', 'border-purple-200'];
    return colors[level % colors.length];
  };

  const getBackgroundColor = (level: number) => {
    const colors = ['bg-blue-50', 'bg-green-50', 'bg-orange-50', 'bg-purple-50'];
    return colors[level % colors.length];
  };

  return (
    <div style={getIndentStyle(level)} className="mb-2">
      <Card className={`${getBorderColor(level)} ${level === 0 ? 'border-2' : 'border'}`}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <CardContent className={`p-4 ${getBackgroundColor(level)} hover:opacity-80 transition-opacity`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasContent && (
                    <div className="text-gray-500">
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-600" />
                    <span className={level === 0 ? 'text-lg font-semibold' : 'font-medium'}>
                      {node.title}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/80">
                  {node.headcount}
                </Badge>
              </div>
              {node.manager && (
                <div className="mt-2 text-left">
                  <span className="text-sm text-gray-600">
                    {node.manager.title ? `${node.manager.title}: ` : ''}
                    <strong>{node.manager.name}</strong>
                  </span>
                </div>
              )}
            </CardContent>
          </CollapsibleTrigger>
          
          {hasContent && (
            <CollapsibleContent>
              <div className="border-t border-gray-200">
                {hasPeople && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {node.people?.map((person, index) => (
                        <div
                          key={index}
                          className="text-sm p-2 bg-gray-50 rounded border"
                        >
                          <div className="font-medium">{person.name}</div>
                          {person.title && (
                            <div className="text-xs text-gray-600">{person.title}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {hasChildren && (
                  <div className="p-2">
                    {node.children?.map((child, index) => (
                      <OrgNodeComponent key={index} node={child} level={level + 1} />
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </Card>
    </div>
  );
};

export const OrgChart: React.FC = () => {
  const [showFutureState, setShowFutureState] = useState(false);

  const currentStateData: OrgNode = {
    title: "Frontline Organization",
    headcount: "≈99 FTE",
    manager: { name: "Harry Statter", title: "CEO" },
    defaultOpen: true,
    children: [
      {
        title: "COO Operations",
        headcount: "77",
        manager: { name: "Chris Lippincott", title: "COO" },
        defaultOpen: true,
        children: [
          {
            title: "Sales",
            headcount: "20",
            children: [
              {
                title: "Directors",
                headcount: "4",
                people: [
                  { name: "Richard Hart", title: "Director of New Construction" },
                  { name: "Doug Jakobsen", title: "Director of Channel Development" },
                  { name: "Jordan Wolff", title: "Director of Sales, Production Homes and Communities" },
                  { name: "Grey Bailey", title: "Director of Sales, Commercial and Industrial" }
                ]
              },
              {
                title: "Territory Managers",
                headcount: "15",
                people: [
                  { name: "Keith Coburn" },
                  { name: "Will Collins" },
                  { name: "Thomas Farmer" },
                  { name: "Sean Kennedy" },
                  { name: "Kelli Kingsborough" },
                  { name: "Michael Martinez" },
                  { name: "Calvin Olbes" },
                  { name: "Gerard Pallotta" },
                  { name: "Kon Phiri" },
                  { name: "Alex Radas" },
                  { name: "Todd Robertson" },
                  { name: "Clint Sales" },
                  { name: "Brad Van Wert" },
                  { name: "Mark Wendel" },
                  { name: "Nate Wilson" }
                ]
              },
              {
                title: "Business Development",
                headcount: "1",
                people: [
                  { name: "Chris Weil", title: "BDR (reports to Doug Jakobsen)" }
                ]
              }
            ]
          },
          {
            title: "Product & Technology",
            headcount: "7",
            manager: { name: "Marc Sells", title: "VP of Product" },
            people: [
              { name: "Chris Coté", title: "Head of Software" },
              { name: "Clinton Murphy", title: "Senior Product Manager, Mobile App" },
              { name: "David Cao", title: "Hardware Systems Engineering Manager" },
              { name: "Robert Villegas", title: "Electro-Mechanical Engineer" },
              { name: "Jake Rose", title: "Director of GIS, Wildfire Data & Intelligence" },
              { name: "Nathan Whittington", title: "Firmware Lead" }
            ]
          },
          {
            title: "Operations",
            headcount: "50",
            children: [
              {
                title: "Project Management & Field Services",
                headcount: "14",
                manager: { name: "Michael Neckel", title: "Director of Project Management and Field Services" },
                children: [
                  {
                    title: "Senior PMs & Ops Management",
                    headcount: "5",
                    people: [
                      { name: "Bobby Cahalan", title: "Sr. PM" },
                      { name: "Marcus Delap", title: "Sr. PM New Construction / Channel" },
                      { name: "Jessica Hernandez", title: "Sr. PM" },
                      { name: "Thanh Nguyen", title: "Sr. PM" },
                      { name: "Wendy Jefferson", title: "Program Manager" }
                    ]
                  },
                  {
                    title: "Project Managers",
                    headcount: "7",
                    people: [
                      { name: "Aaron Arreola" },
                      { name: "Wes Christensen" },
                      { name: "Anthony Hill" },
                      { name: "Donovan Hyde" },
                      { name: "Claire Matranga" },
                      { name: "Drew Nguyen" },
                      { name: "Morgan Saccoman" }
                    ]
                  },
                  {
                    title: "Coordinator",
                    headcount: "1",
                    people: [
                      { name: "Owen Christiaansen", title: "Project Coordinator" }
                    ]
                  }
                ]
              },
              {
                title: "Supply Chain",
                headcount: "2",
                manager: { name: "John Moran", title: "Strategic Sourcing and Supply Chain Lead" },
                people: [
                  { name: "Priscilla Barrett", title: "Procurement Specialist" }
                ]
              },
              {
                title: "Design",
                headcount: "5",
                people: [
                  { name: "Kathleen Dempsey", title: "Senior System Designer" },
                  { name: "Janelle Gardetto", title: "System Designer" },
                  { name: "Emily Poppen", title: "System Designer" },
                  { name: "Matthew Sexton", title: "System Designer" },
                  { name: "Carmen Saunders", title: "System Designer" }
                ]
              },
              {
                title: "Installation Services",
                headcount: "24",
                manager: { name: "Woody Warren", title: "Director of Installation" },
                children: [
                  {
                    title: "Foremen",
                    headcount: "3",
                    people: [
                      { name: "Raymond Arreola" },
                      { name: "Joseph Caliguire" },
                      { name: "Dylan Moore" }
                    ]
                  },
                  {
                    title: "Field Technicians",
                    headcount: "20",
                    people: [
                      { name: "Ian Caliguire", title: "Superintendent" },
                      { name: "Zack Almond" },
                      { name: "Joshua Arreola" },
                      { name: "Mark Axe" },
                      { name: "Joshua Cannan" },
                      { name: "Ricky Cortes" },
                      { name: "Daniel Current" },
                      { name: "Javier Flores" },
                      { name: "Kenneth Gant" },
                      { name: "Colton Lorenz" },
                      { name: "Mario Luna" },
                      { name: "Daniel Malek" },
                      { name: "Jon Marks" },
                      { name: "Cesar Miramontes" },
                      { name: "Manny Moralestorres" },
                      { name: "Dylan Ochoa" },
                      { name: "Jose Ramos-Martinez" },
                      { name: "Christian Ritter" },
                      { name: "Reginald Scott" },
                      { name: "Michael Tomasin" }
                    ]
                  }
                ]
              },
              {
                title: "Cross Functional Support",
                headcount: "5",
                manager: { name: "Carolyn Winters", title: "Sales Operations Manager" },
                people: [
                  { name: "Jacob Moore", title: "Senior Solutions Engineer" },
                  { name: "Bryan Silva", title: "Sales Operations Analyst" },
                  { name: "Silas Lopes", title: "Sales Development Representative" },
                  { name: "Nicholas Nikolopoulous", title: "Sales Development Representative" }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Marketing",
        headcount: "5",
        manager: { name: "Patrick Feehery", title: "VP of Marketing" },
        people: [
          { name: "Todd Bischoff", title: "Creative Director" },
          { name: "Nickolas Blankenship", title: "Director of Growth Marketing" },
          { name: "Allison Murray", title: "Sr. Manager of Content and Communication" },
          { name: "Desirée Finigan", title: "Events & Partnerships Manager" }
        ]
      },
      {
        title: "BizOps & G&A",
        headcount: "14",
        manager: { name: "Jaclyn Hearne", title: "VP of Business Operations" },
        children: [
          {
            title: "Finance",
            headcount: "7",
            people: [
              { name: "Christi Baron", title: "Sr. Revenue Manager" },
              { name: "Brad Cooke", title: "Sr. Financial Analyst" },
              { name: "Jacqueline Figueroa", title: "Construction Accountant" },
              { name: "Iryna Paluyan", title: "Sr. Accountant" },
              { name: "Tameka Perkins", title: "Payroll Manager" },
              { name: "Bill Shields", title: "Sr. Project Accountant" },
              { name: "Shyla Villalba-Mercado", title: "Billing Specialist" }
            ]
          },
          {
            title: "Legal & Contracts",
            headcount: "2",
            people: [
              { name: "Michelle Middleton", title: "General Counsel" },
              { name: "Michelle Scheerer", title: "Contract Administrator" }
            ]
          },
          {
            title: "People & Talent Acquisition",
            headcount: "5",
            people: [
              { name: "Jeff Halligan", title: "Talent Acquisition Manager" },
              { name: "Jackie Hemlock", title: "Sr. Talent Acquisition Specialist" },
              { name: "Yuree Huh", title: "Talent Acquisition Coordinator" },
              { name: "Ashley Khteian", title: "Talent Acquisition Specialist" },
              { name: "Lori Wheeler", title: "Payroll and People Operations Specialist" }
            ]
          }
        ]
      }
    ]
  };

  const futureStateData: OrgNode = {
    title: "Frontline Future State Organization",
    headcount: "≈105 FTE",
    manager: { name: "Harry Statter", title: "CEO" },
    defaultOpen: true,
    children: [
      {
        title: "Chief of Staff",
        headcount: "1",
        people: []
      },
      {
        title: "CRO",
        headcount: "24",
        manager: { name: "TBD", title: "Chief Revenue Officer" },
        children: [
          {
            title: "Sales",
            headcount: "15",
            children: [
              {
                title: "Directors",
                headcount: "4",
                people: [
                  { name: "Richard Hart", title: "New Construction" },
                  { name: "Doug Jakobsen", title: "Channel Development" },
                  { name: "Jordan Wolff", title: "Production Homes Sales (Channel)" },
                  { name: "Grey Bailey", title: "Commercial and Industrial (C&I) Sales (Channel)" }
                ]
              },
              {
                title: "Territory Managers",
                headcount: "9",
                people: [
                  { name: "Keith Coburn" },
                  { name: "Phillip Crum" },
                  { name: "Thomas Farmer" },
                  { name: "Sean Kennedy" },
                  { name: "Michael Martinez" },
                  { name: "Alex Radas" },
                  { name: "Clint Sales" },
                  { name: "Mark Wendel" },
                  { name: "Calvin Olbes" }
                ]
              },
              {
                title: "Partner/Enterprise Managers",
                headcount: "2",
                people: []
              }
            ]
          },
          {
            title: "Marketing",
            headcount: "5",
            manager: { name: "Lucas Maher", title: "Head" },
            children: [
              {
                title: "Growth/Digital",
                headcount: "2",
                people: []
              },
              {
                title: "Brand/Content",
                headcount: "1",
                people: []
              },
              {
                title: "Events/Community",
                headcount: "1",
                people: []
              },
              {
                title: "Marketing Ops",
                headcount: "1",
                people: []
              }
            ]
          },
          {
            title: "Customer Success & Docs",
            headcount: "2",
            children: [
              {
                title: "CSM",
                headcount: "1",
                people: []
              },
              {
                title: "Education/Docs",
                headcount: "1",
                people: []
              }
            ]
          }
        ]
      },
      {
        title: "COO",
        headcount: "46",
        manager: { name: "Chris Lippincott", title: "COO" },
        children: [
          {
            title: "Project Managers",
            headcount: "10",
            people: [
              { name: "Bobby Cahalan", title: "Sr. PM" },
              { name: "Marcus Delap", title: "Sr. PM" },
              { name: "Wendy Jefferson", title: "Ops Mgmt" },
              { name: "Aaron Arreola" },
              { name: "Wes Christensen" },
              { name: "Anthony Hill" },
              { name: "Kaison Lavicka" },
              { name: "Claire Matranga" },
              { name: "Michael Neckel" },
              { name: "Morgan Saccoman" }
            ]
          },
          {
            title: "Pre-Install Design Desk",
            headcount: "6",
            manager: { name: "Jacob Moore", title: "Manager" },
            people: [
              { name: "Kathleen Dempsey", title: "Sr." },
              { name: "Janelle Gardetto" },
              { name: "Emily Poppen" },
              { name: "Matthew Sexton" },
              { name: "Carmen Saunders" }
            ]
          },
          {
            title: "Field Technicians",
            headcount: "21",
            people: [
              { name: "Ian Caliguire", title: "Superintendent" },
              { name: "Zack Almond" },
              { name: "Daniel Alonso" },
              { name: "Joshua Arreola" },
              { name: "Mark Axe" },
              { name: "Michael Bossert" },
              { name: "Joshua Cannan" },
              { name: "Daniel Current" },
              { name: "Javier Flores" },
              { name: "Kenneth Gant" },
              { name: "Isaiah Holmes" },
              { name: "Devin Howard" },
              { name: "Colton Lorenz" },
              { name: "Mario Luna" },
              { name: "Jon Marks" },
              { name: "Beto Martinez" },
              { name: "Jake Matson" },
              { name: "Manuel Morales" },
              { name: "Dylan Ochoa" },
              { name: "Christian Ritter" },
              { name: "Reginald Scott" },
              { name: "Ramon Vallarta" },
              { name: "Ricky Cortes" }
            ]
          },
          {
            title: "Foremen",
            headcount: "4",
            people: [
              { name: "Alex Alvarado" },
              { name: "Raymond Arreola" },
              { name: "Joseph Caliguire" },
              { name: "Dylan Moore" }
            ]
          },
          {
            title: "Supply Chain",
            headcount: "4",
            manager: { name: "John Moran", title: "Head" },
            children: [
              {
                title: "S&OP Planners",
                headcount: "2",
                people: []
              },
              {
                title: "Procurement",
                headcount: "1",
                people: [
                  { name: "Priscilla Deal" }
                ]
              }
            ]
          },
          {
            title: "Contracts",
            headcount: "1",
            people: [
              { name: "Michelle Scheerer" }
            ]
          },
          {
            title: "Customer Support / NOC",
            headcount: "2",
            children: [
              {
                title: "Tier-1",
                headcount: "1",
                people: []
              },
              {
                title: "Tier-2",
                headcount: "1",
                people: []
              }
            ]
          }
        ]
      },
      {
        title: "CPTO",
        headcount: "27",
        manager: { name: "TBD", title: "Chief Product & Technology Officer" },
        children: [
          {
            title: "Product & Program",
            headcount: "3",
            children: [
              {
                title: "Product Managers",
                headcount: "2",
                people: []
              },
              {
                title: "Program/Release Manager",
                headcount: "1",
                people: []
              }
            ]
          },
          {
            title: "Data",
            headcount: "3",
            people: [
              { name: "TBD", title: "Data Engineer" },
              { name: "TBD", title: "Data Scientist" },
              { name: "TBD", title: "GIS/ML Specialist" }
            ]
          },
          {
            title: "Software Engineering",
            headcount: "10",
            manager: { name: "Chris Coté", title: "Head of Software" },
            children: [
              {
                title: "Mobile",
                headcount: "2",
                people: [
                  { name: "Clinton Murphy", title: "Senior Product Manager, Software" }
                ]
              },
              {
                title: "Web",
                headcount: "2",
                people: []
              },
              {
                title: "Backend/API",
                headcount: "3",
                people: []
              },
              {
                title: "Tools/Automation",
                headcount: "2",
                people: []
              },
              {
                title: "Senior Engineers",
                headcount: "1",
                people: []
              }
            ]
          },
          {
            title: "Hardware & Systems",
            headcount: "8",
            manager: { name: "David Cao", title: "Head of Hardware Engineering" },
            children: [
              {
                title: "Electrical Engineering",
                headcount: "2",
                people: []
              },
              {
                title: "Mechanical Engineering",
                headcount: "1",
                people: []
              },
              {
                title: "Systems/Compliance",
                headcount: "1",
                people: []
              },
              {
                title: "Reliability/Test",
                headcount: "1",
                people: []
              },
              {
                title: "NPI Engineer",
                headcount: "1",
                people: []
              },
              {
                title: "Supplier Quality",
                headcount: "1",
                people: []
              }
            ]
          },
          {
            title: "Firmware",
            headcount: "2",
            people: [
              { name: "TBD", title: "OTA Lead" },
              { name: "TBD", title: "FW Engineer" }
            ]
          },
          {
            title: "Security",
            headcount: "1",
            people: [
              { name: "TBD", title: "Security Lead" }
            ]
          }
        ]
      },
      {
        title: "CFO",
        headcount: "7",
        manager: { name: "TBD", title: "Chief Financial Officer" },
        children: [
          {
            title: "Accounting",
            headcount: "4",
            people: [
              { name: "Rukudzo Chawora", title: "Controller" },
              { name: "Bridget Ross", title: "Staff Accountant" },
              { name: "Bill Shields", title: "Sr. Project Accountant" },
              { name: "Iryna Paluyan", title: "Sr. Accountant" }
            ]
          },
          {
            title: "FP&A",
            headcount: "1",
            people: [
              { name: "Bryan Silva" }
            ]
          },
          {
            title: "Billing/Collections",
            headcount: "1",
            people: [
              { name: "Shyla Cuadras" }
            ]
          },
          {
            title: "Payroll",
            headcount: "1",
            people: []
          }
        ]
      },
      {
        title: "GC & Policy",
        headcount: "4",
        manager: { name: "TBD", title: "General Counsel" },
        children: [
          {
            title: "Director Policy/Gov Affairs",
            headcount: "1",
            people: []
          },
          {
            title: "Counsel",
            headcount: "1",
            people: []
          },
          {
            title: "Contracts",
            headcount: "1",
            people: []
          },
          {
            title: "Compliance",
            headcount: "1",
            people: []
          }
        ]
      },
      {
        title: "People & IT",
        headcount: "5",
        manager: { name: "TBD", title: "Chief People Officer" },
        children: [
          {
            title: "Talent Acquisition",
            headcount: "2",
            people: []
          },
          {
            title: "People Ops/HR",
            headcount: "2",
            people: []
          },
          {
            title: "IT/Workplace",
            headcount: "1",
            people: []
          }
        ]
      }
    ]
  };

  const orgData = showFutureState ? futureStateData : currentStateData;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant={!showFutureState ? "default" : "outline"}
            onClick={() => setShowFutureState(false)}
          >
            Current State (≈99 FTE)
          </Button>
          <Button
            variant={showFutureState ? "default" : "outline"}
            onClick={() => setShowFutureState(true)}
          >
            Proposed Future State (≈105 FTE)
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          {showFutureState ? "Frontline Proposed Future-State Organization" : "Frontline Current-State Organization"}
        </h1>
        <p className="text-center text-gray-600">
          Click on any section to expand or collapse details
        </p>
      </div>
      <OrgNodeComponent node={orgData} level={0} />
    </div>
  );
};