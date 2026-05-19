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
    headcount: "≈80 FTE",
    manager: { name: "Harry Statter", title: "CEO" },
    defaultOpen: true,
    children: [
      {
        title: "Policy",
        headcount: "1",
        manager: { name: "Amanda Parsons", title: "Head of Policy" }
      },
      {
        title: "COO Operations",
        headcount: "≈66 FTE",
        manager: { name: "Chris Lippincott", title: "COO" },
        defaultOpen: true,
        children: [
          {
            title: "Sales",
            headcount: "≈13",
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
              }
            ]
          },
          {
            title: "Product & Technology",
            headcount: "8",
            manager: { name: "Marc Sells", title: "Head" },
            people: [
              { name: "Chris Coté", title: "Head of Software" },
              { name: "Clinton Murphy", title: "Senior Product Manager, Software" },
              { name: "David Cao", title: "Head of Hardware Engineering" },
              { name: "Robert Villegas", title: "Electro-Mechanical Engineer" },
              { name: "TBH", title: "Firmware Lead" },
              { name: "TBH", title: "Full Stack Software Engineer" },
              { name: "TBH", title: "Director of Wildfire Data & Platform" }
            ]
          },
          {
            title: "Operations",
            headcount: "≈46",
            children: [
              {
                title: "Project Managers",
                headcount: "13",
                children: [
                  {
                    title: "Senior PMs & Ops Management",
                    headcount: "3",
                    people: [
                      { name: "Bobby Cahalan", title: "Sr. PM" },
                      { name: "Marcus Delap", title: "Sr. PM" },
                      { name: "Wendy Jefferson", title: "Ops Mgmt" }
                    ]
                  },
                  {
                    title: "Project Managers",
                    headcount: "9",
                    people: [
                      { name: "Aaron Arreola" },
                      { name: "Wes Christensen" },
                      { name: "Anthony Hill" },
                      { name: "Kaison Lavicka" },
                      { name: "Claire Matranga" },
                      { name: "Michael Neckel" },
                      { name: "Morgan Saccoman" },
                      { name: "Ben Zieff" }
                    ]
                  },
                  {
                    title: "Coordinator",
                    headcount: "1",
                    people: [
                      { name: "Owen Christiaansen", title: "Coordinator" }
                    ]
                  }
                ]
              },
              {
                title: "Supply Chain",
                headcount: "2",
                manager: { name: "John Moran", title: "Head" },
                people: [
                  { name: "Priscilla Deal", title: "Procurement" }
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
                title: "Field Technicians",
                headcount: "20+",
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
              }
            ]
          }
        ]
      },
      {
        title: "Marketing",
        headcount: "3",
        manager: { name: "TBD", title: "Head" },
        people: [
          { name: "Desiree Finigan", title: "Events & Partnerships" },
          { name: "Jennifer Monarez", title: "SDR" }
        ]
      },
      {
        title: "BizOps & G&A",
        headcount: "9",
        manager: { name: "Jaclyn Hearne", title: "Director" },
        children: [
          {
            title: "Finance",
            headcount: "6",
            people: [
              { name: "Rukudzo Chawora", title: "Controller" },
              { name: "Shyla Cuadras", title: "Billing" },
              { name: "Bridget Ross", title: "Staff Accountant" },
              { name: "Bryan Silva", title: "FP&A" },
              { name: "Bill Shields", title: "Sr. Project Accountant" },
              { name: "Iryna Paluyan", title: "Sr. Accountant" }
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
            title: "HR",
            headcount: "2",
            people: [
              { name: "Jackie Hemlock", title: "TA" },
              { name: "Lori Wheeler", title: "TA" }
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
            Current State - August 2025 (≈80 FTE)
          </Button>
          <Button
            variant={showFutureState ? "default" : "outline"}
            onClick={() => setShowFutureState(true)}
          >
            Proposed Future State (≈105 FTE)
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          {showFutureState ? "Frontline Proposed Future-State Organization" : "Frontline Current-State Organization (August 2025)"}
        </h1>
        <p className="text-center text-gray-600">
          Click on any section to expand or collapse details
        </p>
      </div>
      <OrgNodeComponent node={orgData} level={0} />
    </div>
  );
};