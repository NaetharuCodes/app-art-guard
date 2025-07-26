import {
  Plus,
  GripVertical,
  Trash2,
  Edit3,
  Save,
  Eye,
  Clock,
  CheckCircle,
  MessageSquare,
  Settings,
  ArrowDown,
  User,
  Palette,
  Shield,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// TypeScript interfaces
interface WorkflowStep {
  id: number;
  type: "core" | "approve" | "create" | "request";
  title: string;
  description: string;
  duration: string;
  required: boolean;
  fixed: boolean;
}

interface StepTemplate {
  title: string;
  description: string;
}

interface StepTypeConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
  description: string;
}

// Step type definitions
const STEP_TYPES: Record<string, StepTypeConfig> = {
  core: {
    icon: Shield,
    color: "bg-primary/10 text-primary border-primary/20",
    label: "Core",
    description: "Essential process steps",
  },
  approve: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-700 border-green-200",
    label: "Approve",
    description: "Client review and approval",
  },
  create: {
    icon: Palette,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Create",
    description: "Artist creation work",
  },
  request: {
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    label: "Request",
    description: "Request info from client",
  },
};

// Default flow template
const DEFAULT_FLOW: WorkflowStep[] = [
  {
    id: 1,
    type: "core",
    title: "Provide Client Access",
    description: "Share portfolio and grant access to commission process",
    duration: "Immediate",
    required: true,
    fixed: true,
  },
  {
    id: 2,
    type: "request",
    title: "Gather Requirements",
    description: "Collect project details, references, and specifications",
    duration: "1-2 days",
    required: false,
    fixed: false,
  },
  {
    id: 3,
    type: "core",
    title: "Confirm Pricing & Timeline",
    description: "Finalize project scope, cost, and delivery schedule",
    duration: "1 day",
    required: false,
    fixed: false,
  },
  {
    id: 4,
    type: "create",
    title: "Create Initial Concepts",
    description: "Develop 2-3 thumbnail sketches or initial concepts",
    duration: "3-5 days",
    required: false,
    fixed: false,
  },
  {
    id: 5,
    type: "approve",
    title: "Concept Approval",
    description: "Client reviews and selects preferred direction",
    duration: "2-3 days",
    required: false,
    fixed: false,
  },
  {
    id: 6,
    type: "create",
    title: "Develop Final Artwork",
    description: "Create detailed final piece based on approved concept",
    duration: "5-10 days",
    required: false,
    fixed: false,
  },
  {
    id: 7,
    type: "approve",
    title: "Final Review",
    description:
      "Client reviews final artwork and requests any minor revisions",
    duration: "2-3 days",
    required: false,
    fixed: false,
  },
  {
    id: 8,
    type: "core",
    title: "Job Complete",
    description: "Deliver final files and complete commission",
    duration: "1 day",
    required: true,
    fixed: true,
  },
];

const STEP_TEMPLATES: Record<string, StepTemplate[]> = {
  core: [
    {
      title: "Provide Client Access",
      description: "Share portfolio and grant access",
    },
    {
      title: "Payment Processing",
      description: "Handle deposit or final payment",
    },
    { title: "Contract Signing", description: "Finalize commission agreement" },
    {
      title: "Job Complete",
      description: "Deliver final files and complete commission",
    },
  ],
  approve: [
    {
      title: "Concept Approval",
      description: "Client reviews initial concepts",
    },
    { title: "Draft Review", description: "Client reviews work-in-progress" },
    { title: "Final Approval", description: "Client approves final artwork" },
    {
      title: "Revision Review",
      description: "Client reviews requested changes",
    },
  ],
  create: [
    { title: "Initial Sketches", description: "Create rough concept sketches" },
    { title: "Detailed Draft", description: "Develop refined artwork" },
    { title: "Final Artwork", description: "Complete final piece" },
    { title: "Revisions", description: "Make client-requested changes" },
  ],
  request: [
    {
      title: "Gather Requirements",
      description: "Collect project specifications",
    },
    {
      title: "Request References",
      description: "Ask for visual references or examples",
    },
    {
      title: "Clarify Details",
      description: "Get additional project information",
    },
    {
      title: "Schedule Check-in",
      description: "Coordinate timing with client",
    },
  ],
};

const CommissionFlowBuilderPage: React.FC = () => {
  const [workflowSteps, setWorkflowSteps] =
    useState<WorkflowStep[]>(DEFAULT_FLOW);
  const [workflowName, setWorkflowName] = useState<string>(
    "Main Commission Flow"
  );
  const [editingStep, setEditingStep] = useState<number | null>(null);

  // Add new step after a specific position
  const addStep = (
    afterIndex: number,
    stepType: string,
    template: StepTemplate | null = null
  ): void => {
    const newStep: WorkflowStep = {
      id: Date.now(),
      type: stepType as WorkflowStep["type"],
      title: template?.title || `New ${STEP_TYPES[stepType].label} Step`,
      description: template?.description || "",
      duration: "1-2 days",
      required: false,
      fixed: false,
    };

    const newSteps = [...workflowSteps];
    newSteps.splice(afterIndex + 1, 0, newStep);
    setWorkflowSteps(newSteps);
  };

  // Remove step (only if not fixed)
  const removeStep = (stepId: number): void => {
    setWorkflowSteps(workflowSteps.filter((step) => step.id !== stepId));
  };

  // Update step
  const updateStep = (stepId: number, updates: Partial<WorkflowStep>): void => {
    setWorkflowSteps(
      workflowSteps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    );
    setEditingStep(null);
  };

  const StepTypeIcon: React.FC<{ type: WorkflowStep["type"] }> = ({ type }) => {
    const IconComponent = STEP_TYPES[type].icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const StepCard: React.FC<{ step: WorkflowStep; index: number }> = ({
    step,
    index,
  }) => {
    const stepType = STEP_TYPES[step.type];
    const isEditing = editingStep === step.id;

    return (
      <div key={step.id} className="relative">
        <Card className="group">
          <CardContent>
            <div className="flex items-start gap-3">
              {/* Drag handle */}
              {!step.fixed && (
                <button className="opacity-0 group-hover:opacity-100 mt-1">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              )}

              {/* Step content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={stepType.color}>
                      <StepTypeIcon type={step.type} />
                      <span className="ml-1">{stepType.label}</span>
                    </Badge>
                    {step.required && (
                      <Badge variant="secondary">Required</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  {!step.fixed && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingStep(step.id)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={step.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateStep(step.id, { title: e.target.value })
                      }
                      placeholder="Step title"
                    />
                    <textarea
                      value={step.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateStep(step.id, { description: e.target.value })
                      }
                      className="w-full min-h-[60px] px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      placeholder="Step description"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={step.duration}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateStep(step.id, { duration: e.target.value })
                        }
                        placeholder="Duration"
                        className="flex-1"
                      />
                      <Button size="sm" onClick={() => setEditingStep(null)}>
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {step.type === "approve" || step.type === "request"
                          ? "Client Action"
                          : "Artist Action"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add step button between cards */}
        {index < workflowSteps.length - 1 && (
          <div className="flex justify-center py-3">
            <div className="flex flex-col items-center gap-2">
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full bg-background border border-border opacity-0 group-hover:opacity-100"
                onClick={() => addStep(index, "create")}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Input
              value={workflowName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWorkflowName(e.target.value)
              }
              className="text-2xl font-bold border-none p-0 h-auto bg-transparent"
            />
            <Badge variant="secondary">{workflowSteps.length} steps</Badge>
          </div>
          <p className="text-muted-foreground">
            Design your commission process to guide clients through each step
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Step Types Palette */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Add Step Types</h3>

          {Object.entries(STEP_TYPES).map(([type, config]) => (
            <Card key={type} className="cursor-pointer hover:border-primary/50">
              <CardContent>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={config.color}>
                    <config.icon className="h-4 w-4" />
                    <span className="ml-1">{config.label}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {config.description}
                </p>

                {/* Template examples */}
                <div className="space-y-1">
                  {STEP_TEMPLATES[type].slice(0, 2).map((template, i) => (
                    <button
                      key={i}
                      className="w-full text-left p-2 text-xs rounded hover:bg-muted"
                      onClick={() =>
                        addStep(workflowSteps.length - 2, type, template)
                      }
                    >
                      <div className="font-medium">{template.title}</div>
                      <div className="text-muted-foreground">
                        {template.description}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Timeline */}
        <div className="lg:col-span-3 space-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Workflow Steps</h3>
            <div className="text-sm text-muted-foreground">
              Estimated total:{" "}
              {workflowSteps.reduce((total, step) => {
                const days = step.duration.match(/\d+/)?.[0] || 1;
                return total + parseInt(days);
              }, 0)}{" "}
              days
            </div>
          </div>

          {workflowSteps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}

          {/* Add first step button if empty */}
          {workflowSteps.length === 0 && (
            <Card className="border-2 border-dashed border-border">
              <CardContent className="p-8 text-center">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Building Your Flow
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add steps from the palette to create your commission process
                </p>
                <Button onClick={() => setWorkflowSteps(DEFAULT_FLOW)}>
                  Load Default Template
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionFlowBuilderPage;
