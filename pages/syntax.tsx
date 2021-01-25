import { ReactNode } from 'react'
import { getStaticProps } from '.'
import Layout from '../components/layout'

const Terminal: React.FC<{}> = props => {
  return <span className="terminal">{props.children}</span>
}

const NonTerminal: React.FC<{}> = props => {
  return <span className="nonterminal">{props.children}</span>
}

const SingletonType: React.FC<{ readonly typeName?: any}> = ({typeName}) => (
  <span>
    <Terminal>singleton(</Terminal>
    {typeName || <ClassName />}
    <Terminal>)</Terminal>
  </span>
)

const InstanceType: React.FC<{ readonly TypeName?: string }> = (props) => (
  <span>
    {props.TypeName || <NonTerminal>TypeName</NonTerminal>}
    <Terminal>[</Terminal>
    {props.children}
    <Terminal>]</Terminal>
  </span>
)

const VB: React.FC = props => <span className="vb">|</span>

const A: React.FC<{ children: ReactNode }> = props => {
  return <span className="alt"><VB />{props.children}</span>
}

function tag(node: ReactNode): React.FC {
  return ({}) => <>{node}</>
}

const ClassName = tag(<NonTerminal>class-name</NonTerminal>)
const InterfaceName = tag(<NonTerminal>interface-name</NonTerminal>)
const TypeArgs = tag(<NonTerminal>type-arguments</NonTerminal>)
const AliasName = tag(<NonTerminal>alias-name</NonTerminal>)
const Literal = tag(<NonTerminal>literal</NonTerminal>)
const Type = tag(<NonTerminal>type</NonTerminal>)
const Pipe = tag(<Terminal>|</Terminal>)
const RecordField = tag(<NonTerminal>record-field</NonTerminal>)
const Comma = tag(<Terminal>,</Terminal>)
const TypeVariable = tag(<NonTerminal>type-variable</NonTerminal>)
const Parameters = tag(<NonTerminal>parameters</NonTerminal>)
const Self = tag(<Terminal>self</Terminal>)
const Instance = tag(<Terminal>instance</Terminal>)
const Class = tag(<Terminal>class</Terminal>)
const Untyped = tag(<Terminal>untyped</Terminal>)
const Void = tag(<Terminal>void</Terminal>)
const Top = tag(<Terminal>top</Terminal>)
const Bot = tag(<Terminal>bot</Terminal>)
const Nil = tag(<Terminal>nil</Terminal>)
const Bool = tag(<Terminal>bool</Terminal>)
const Namespace = tag(<NonTerminal>namespace</NonTerminal>)
const CapitalIdent = tag(<NonTerminal>capital-ident</NonTerminal>)
const LowercaseIdent = tag(<NonTerminal>lowercase-ident</NonTerminal>)

const Empty: React.FC<{}> = props => {
  return <span style={{ color: "#AAA" }}>∅</span>
}

const Table: React.FC<{ children: ReactNode}> = props => {
  return <div className="syntax-table">{props.children}</div>
}

const Row: React.FC<{ children: ReactNode, lhs: ReactNode }> = props => {
  return <>
    <div className="left">
      {props.lhs}
      <span className="opr">::=</span>
    </div>
    <div className="right">{props.children}</div>
  </>
}

const Braced: React.FC<{ children?: ReactNode }> = props => {
  return <>
    <Terminal>{"{"}</Terminal>
    {props.children}
    <Terminal>{"}"}</Terminal>
  </>
}

const Parenthesized: React.FC<{ children?: ReactNode }> = props => {
  if (props.children) {
    return <>
    <Terminal>{"("}</Terminal>
    {props.children}
    <Terminal>{")"}</Terminal>
  </>
  } else {
    return <Terminal>()</Terminal>
  }
}

const Note: React.FC<{ children: ReactNode }> = props => {
  return <span className="note">({props.children})</span>
}

const Syntax: React.FC<{}> = () => {
  return <Layout home={false}>
      <h1>RBS Syntax</h1>

      <h2>Types</h2>

      <div className="syntax-table">
        <div className="left">
          <Type />
          <span className="opr">::=</span>
        </div>
        <div className="right">
          <A>
            <ClassName />
            <TypeArgs />
            <Note>Class instance type</Note>
          </A>
          <A>
            <InterfaceName />
            <TypeArgs />
            <Note>Interface type</Note>
          </A>
          <A>
            <SingletonType />
            <Note>Class singleton type</Note>
          </A>
          <A>
            <AliasName />
            <Note>Alias type</Note>
          </A>
          <A>
            <Literal />
            <Note>Literal type</Note>
          </A>
          <A>
            <Type /> <Pipe /> <Type />
            <Note>Union type</Note>
          </A>
          <A>
            <Type /> <Terminal>{"&"}</Terminal> <Type />
            <Note>Intersection type</Note>
          </A>
          <A>
            <Type /> <Terminal>?</Terminal>
            <Note>Optional type</Note>
          </A>
          <A>
            <Braced>
              <RecordField /> <Comma/> ...
            </Braced>
            <Note>Record type</Note>
          </A>
          <A>
            <Terminal>[]</Terminal>
            <VB/>
            <Terminal>[</Terminal>
              <Type /> <Comma /> ...
            <Terminal>]</Terminal>
            <Note>Tuple type</Note>
          </A>
          <A>
            <TypeVariable />
          </A>
          <A>
            <Terminal>^</Terminal>
            <MethodType />
            <Note>Proc type</Note>
          </A>
          <A>
            <Untyped />
          </A>
          <A>
            <Self />
            <VB />
            <Instance />
            <VB/>
            <Class />
          </A>
          <A>
            <Top />
            <VB />
            <Bot />
          </A>
          <A>
            <Bool />
            <VB />
            <Void />
          </A>
        </div>
      </div>
      <Table>
        <Row lhs={<ClassName />}>
          <A>
            <Namespace/> <CapitalIdent/>
          </A>
        </Row>
        <Row lhs={<InterfaceName/>}>
          <A>
            <Namespace/> <Terminal>_</Terminal> <CapitalIdent/>
          </A>
        </Row>
        <Row lhs={<AliasName/>}>
          <A>
            <Namespace/> <LowercaseIdent/>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<Namespace/>}>
          <A>
            <Empty />
            <Note>Empty namespace</Note>
          </A>
          <A>
            <Terminal>::</Terminal>
            <Note>Root</Note>
          </A>
          <A>
            <Namespace />
            <CapitalIdent />
            <Terminal>::</Terminal>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<TypeVariable />}>
          <A>
            <CapitalIdent/>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<TypeArgs />}>
          <A>
            <Empty />
          </A>
          <A>
            <Terminal>[</Terminal>
              <Type /> <Comma />
              ...
            <Terminal>]</Terminal>
            <Note>Arguments</Note>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<RecordField />}>
          <A>
            <CapitalIdent /> <Terminal>:</Terminal> <Type />
          </A>
          <A>
            <LowercaseIdent /> <Terminal>:</Terminal> <Type />
          </A>
          <A>
            <QuotedIdent /> <Terminal>:</Terminal> <Type />
          </A>
          <A>
            <StringLiteral /> <FatAllow/> <Type />
          </A>
          <A>
            <IntegerLiteral /> <FatAllow/> <Type />
          </A>
          <A>
            <SymbolLiteral /> <FatAllow/> <Type />
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<Literal />}>
          <A>
            <StringLiteral />
            <Note>String literal</Note>
          </A>
          <A>
            <SymbolLiteral />
            <Note>Symbol literal</Note>
          </A>
          <A>
            <IntegerLiteral />
            <Note>Integer literal</Note>
          </A>
          <A>
            <True /> <VB /> <False /> <VB /> <Nil />
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<CapitalIdent />}>
          <A><code>/[A-Z]\w*/</code></A>
        </Row>
        <Row lhs={<LowercaseIdent />}>
          <A>
            <code>/[a-z]\w*/</code>
          </A>
        </Row>
        <Row lhs={<StringLiteral />}>
          <A>
            <Terminal>"</Terminal>
            letters
            <Terminal>"</Terminal>
            <VB />
            <Terminal>'</Terminal>
            letters
            <Terminal>'</Terminal>
          </A>
        </Row>
        <Row lhs={<IntegerLiteral />}>
          <A>
            <code>/[+-]?\d[\d_]*/</code>
          </A>
        </Row>
        <Row lhs={<SymbolLiteral />}>
          <A>
            <Terminal>:</Terminal>
            letters
          </A>
        </Row>
        <Row lhs={<QuotedIdent />}>
          <A>
            <Terminal>`</Terminal>
            any letters
            <Terminal>`</Terminal>
          </A>
        </Row>
      </Table>

      <h2>Method types</h2>
      <Table>
        <Row lhs={<MethodType />}>
          <A>
            <Parenthesized>
              <Parameters />
            </Parenthesized>
            <Arrow />
            <Type/>
            <Note>Without block</Note>
          </A>
          <A>
            <Parenthesized>
              <Parameters />
            </Parenthesized>
            <Braced>
              <Parenthesized><Parameters /></Parenthesized>
              <Arrow />
              <Type />
            </Braced>
            <Terminal>{"->"}</Terminal>
            <Type/>
            <Note>With required block</Note>
          </A>
          <A>
            <Parenthesized>
              <Parameters />
            </Parenthesized>
            <Terminal>?</Terminal>
            <Braced>
              <Parenthesized><Parameters /></Parenthesized>
              <Arrow />
              <Type />
            </Braced>
            <Terminal>{"->"}</Terminal>
            <Type/>
            <Note>With optional block</Note>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<Parameters />}>
          <A>
            <PositionalParameters />
            <KeywordParameters />
          </A>
        </Row>
        <Row lhs={<PositionalParameters />}>
          <A>
            <RequiredParams />
            <OptionalParams />
            <RestParams />
            <TrailingParams />
          </A>
        </Row>
        <Row lhs={<RequiredParams />}>
          <A>
            <Empty />
            <VB />
            <Param /> <Comma /> ...
          </A>
        </Row>
        <Row lhs={<OptionalParams />}>
          <A>
            <Empty />
            <VB />
            <Terminal>?</Terminal>
            <Param /> <Comma /> ...
          </A>
        </Row>
        <Row lhs={<RestParams />}>
          <A>
            <Empty />
            <VB />
            <Terminal>*</Terminal>
            <Param />
          </A>
        </Row>
        <Row lhs={<TrailingParams />}>
          <A>
            <Empty />
            <VB />
            <Param /> <Comma /> ...
          </A>
        </Row>
        <Row lhs={<KeywordParameters />}>
          <A>
            <Empty />
          </A>
          <A>
            <Keyword />
            <Comma />
            <KeywordParameters />
            <Note>Required keyword</Note>
          </A>
          <A>
            <Terminal>?</Terminal>
            <Keyword />
            <Comma />
            <KeywordParameters />
            <Note>Optional keyword</Note>
          </A>
          <A>
            <Terminal>**</Terminal>
            <Param />
            <Note>Rest keyword</Note>
          </A>
        </Row>
        <Row lhs={<Keyword />}>
          <A>
            <CapitalIdent /> <code>/[!?]?/</code> <Terminal>:</Terminal> <Param/>
          </A>
          <A>
            <LowercaseIdent /> <code>/[!?]?/</code> <Terminal>:</Terminal> <Param/>
          </A>
        </Row>
        <Row lhs={<Param />}>
          <A>
            <Type />
            <Note>Parameter without parameter name</Note>
          </A>
          <A>
            <Type />
            <LowercaseIdent />
            <Note>Parameter with parameter name</Note>
          </A>
        </Row>
      </Table>

      <h2>Definitions</h2>

      <Table>
        <Row lhs={<ClassDefinition />}>
          <A>
            <Class />
            <ClassName />
            <ClassMember />
            ...
            <End />
            <Note>Class without super class</Note>
          </A>
          <A>
            <Class />
            <ClassName />
            <Terminal>{"<:"}</Terminal>
            <SuperClass />
            <ClassMember />
            ...
            <End />
            <Note>Class with super class</Note>
          </A>
        </Row>
        <Row lhs={<SuperClass />}>
          <A>
            <ClassName /> <TypeArgs />
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<ModuleDefinition />}>
          <A>
            <Module />
            <ClassName />
            <ClassMember />
            ...
            <End />
            <Note>Module without self types</Note>
          </A>
          <A>
            <Module />
            <ClassName />
            <Terminal>{":"}</Terminal>
            <SelfTypes />
            <ClassMember />
            ...
            <End />
            <Note>Module with self types</Note>
          </A>
        </Row>
        <Row lhs={<SelfTypes />}>
          <A>
            <SelfType /> <Comma /> ...
          </A>
        </Row>
        <Row lhs={<SelfType />}>
          <A>
            <ClassName /> <TypeArgs />
            <Note>Class self type</Note>
          </A>
          <A>
            <InterfaceName /> <TypeArgs />
            <Note>Interface self type</Note>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<InterfaceDefinition />}>
          <A>
            <Interface/> <InterfaceName/> <InterfaceMember/> ... <End/>
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<ConstantDefinition />}>
          <A>
            <ClassName /> <Terminal>:</Terminal> <Type />
          </A>
        </Row>
        <Row lhs={<GlobalDefinition />}>
          <A>
            <GlobalName /> <Terminal>:</Terminal> <Type />
          </A>
        </Row>
        <Row lhs={<AliasDefinition />}>
          <A>
            <AliasName /> <Terminal>=</Terminal> <Type />
          </A>
        </Row>
        <Row lhs={<GlobalName />}>
          <A>
            <Terminal>$</Terminal>
            <CapitalIdent />
            <VB />
            <Terminal>$</Terminal>
            <LowercaseIdent />
          </A>
        </Row>
      </Table>

      <Table>
        <Row lhs={<ToplevelDefinition />}>
          <A>
            <ClassDefinition />
            <VB />
            <ModuleDefinition />
            <VB/>
            <InterfaceDefinition/>
          </A>
          <A>
            <ConstantDefinition />
            <VB />
            <GlobalDefinition />
            <VB />
            <AliasDefinition />
          </A>
        </Row>
      </Table>

      <h2>Members</h2>

      <Table>
        <Row lhs={<ClassMember />}>
          <A>
            <InterfaceDefinition/>
            <VB/>
            <ClassDefinition/>
            <VB/>
            <ModuleDefinition/>
          </A>
          <A>
            <AliasDefinition/>
            <VB/>
            <ConstantDefinition/>
          </A>
          <A>
            <Def/> <MethodName/> <Colon/> <GenericParams/> <MethodType/>
          </A>
          <A>
            <Def/> <Terminal>self.</Terminal> <MethodName/> <Colon/> <GenericParams/> <MethodType/>
          </A>
          <A>
            <Def/> <Terminal>self?.</Terminal> <MethodName/> <Colon/> <GenericParams/> <MethodType/>
          </A>
          <A>
            <Alias/> <MethodName/> <MethodName/>
          </A>
          <A>
            <Alias/> <Terminal>self.</Terminal> <MethodName/> <Terminal>self.</Terminal> <MethodName/>
          </A>
          <A>
            <Include/> <ClassName/> <TypeArgs/>
          </A>
          <A>
            <Extend/> <ClassName/> <TypeArgs/>
          </A>
          <A>
            <Prepend/> <ClassName/> <TypeArgs/>
          </A>
          <A>
            <Include/> <InterfaceName/> <TypeArgs/>
          </A>
          <A>
            <Extend/> <InterfaceName/> <TypeArgs/>
          </A>
          <A>
            <Attribute/> <AttributeName/> <Colon/> <Type/>
          </A>
          <A>
            <Attribute/> <AttributeName/> <Parenthesized><IvarName/></Parenthesized> <Colon/> <Type/>
          </A>
          <A>
            <Attribute/> <AttributeName/> <Parenthesized></Parenthesized> <Colon/> <Type/>
          </A>
          <A>
            <PublicMember /> <VB/> <PrivateMember/>
          </A>
        </Row>
        <Row lhs={<InterfaceMember/>}>
          <A>
            <Def/> <MethodName/> <Colon/> <GenericParams/> <MethodType/>
          </A>
          <A>
            <Include/> <InterfaceName/> <TypeArgs />
          </A>
          <A>
            <Alias/> <MethodName/> <MethodName/>
          </A>
        </Row>
        <Row lhs={<Attribute/>}>
          <A>
            <Terminal>attr_reader</Terminal>
            <VB/>
            <Terminal>attr_accessor</Terminal>
            <VB/>
            <Terminal>attr_writer</Terminal>
          </A>
        </Row>
        <Row lhs={<GenericParams/>}>
          <A>
            <Empty/>
          </A>
          <A>
            <Terminal>[</Terminal>
            <TypeVariable/>
            <Comma/>
            ...
            <Terminal>]</Terminal>
          </A>
        </Row>
      </Table>
    </Layout>
}

function NT(content: string): React.FC<{}> {
  return (props) => {
    return <NonTerminal>{content}</NonTerminal>
  }
}
function T(content: string): React.FC<{}> {
  return (props) => {
    return <Terminal>{content}</Terminal>
  }
}

const StringLiteral = tag(<NonTerminal>string-literal</NonTerminal>)
const IntegerLiteral = tag(<NonTerminal>integer-literal</NonTerminal>)
const SymbolLiteral = tag(<NonTerminal>symbol-literal</NonTerminal>)
const True = tag(<Terminal>true</Terminal>)
const False = tag(<Terminal>false</Terminal>)
const FatAllow = tag(<Terminal>{"=>"}</Terminal>)
const QuotedIdent = tag(<NonTerminal>quoted-ident</NonTerminal>)
const MethodType = tag(<NonTerminal>method-type</NonTerminal>)
const Arrow = tag(<Terminal>{"->"}</Terminal>)
const PositionalParameters = tag(<NonTerminal>positional-params</NonTerminal>)
const KeywordParameters = tag(<NonTerminal>keyword-params</NonTerminal>)
const RequiredParams = NT("required-params")
const OptionalParams = NT("optional-params")
const RestParams = NT("rest-params")
const TrailingParams = NT("trailing-params")
const Param = NT("param")
const Keyword = NT("keyword")

const ToplevelDefinition = NT("toplevel-definition")
const AliasDefinition = NT("alias-definition")
const GlobalDefinition = NT("global-definition")
const InterfaceDefinition = NT("interface-definition")
const ConstantDefinition = NT("constant-definition")
const ClassDefinition = NT("class-definition")
const ModuleDefinition = NT("module-definition")
const SuperClass = NT("super-class")
const End = T("end")
const Module = T("module")
const SelfTypes = NT("self-types")
const SelfType = NT("self-type")
const GlobalName = NT("global-name")

const ClassMember = NT("class-member")
const InterfaceMember = NT("interface-member")

const DefMember = NT("def-member")
const AliasMember = NT("alias-member")
const IvarMember = NT("ivar-member")
const AttributeMember = NT("attribute-member")
const MixinMember = NT("mixin-member")
const PublicMember = T("public")
const PrivateMember = T("private")
const Interface = T("interface")

const Attribute = NT("attribute")

const InstanceDefMember = NT("instance-def-member")
const InstanceAliasMember = NT("instance-alias-member")
const InterfaceMixinMember = NT("interface-mixin")
const Def = T("def")
const Colon = T(":")
const MethodName = NT("method-name")
const GenericParams = NT("generic-params")
const Include = T("include")
const Extend = T("extend")
const Prepend = T("prepend")
const Alias = T("alias")
const AttributeName = NT("attribute-name")
const IvarName = NT("ivar-name")

export default Syntax

